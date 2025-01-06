import React, { useState, useEffect } from 'react';
import { Bell, BellOff } from 'lucide-react';

const NotificationManager = ({ event, language }) => {
  const [notificationPermission, setNotificationPermission] = useState('default');
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
      checkSubscription();
    }
  }, [event]);

  const checkSubscription = () => {
    const subscriptions = JSON.parse(localStorage.getItem('notificationSubscriptions') || '{}');
    setIsSubscribed(!!subscriptions[event.id]);
  };

  const scheduleNotification = async () => {
    if (notificationPermission !== 'granted') {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
      if (permission !== 'granted') return;
    }

    const { location, date } = event;
    const eventTime = new Date(date);
    const [hours, minutes] = location.schedule.time.start.split(':');
    eventTime.setHours(parseInt(hours), parseInt(minutes));

    // Schedule notification for 1 day before and 1 hour before
    const dayBefore = new Date(eventTime.getTime() - 24 * 60 * 60 * 1000);
    const hourBefore = new Date(eventTime.getTime() - 60 * 60 * 1000);

    if (dayBefore > new Date()) {
      scheduleNotificationAt(dayBefore, 'day');
    }
    if (hourBefore > new Date()) {
      scheduleNotificationAt(hourBefore, 'hour');
    }

    // Save subscription
    const subscriptions = JSON.parse(localStorage.getItem('notificationSubscriptions') || '{}');
    subscriptions[event.id] = true;
    localStorage.setItem('notificationSubscriptions', JSON.stringify(subscriptions));
    setIsSubscribed(true);
  };

  const scheduleNotificationAt = (time, type) => {
    const timeoutId = setTimeout(() => {
      const texts = {
        title: {
          en: 'Produce Distribution Reminder',
          es: 'Recordatorio de Distribución de Productos',
          zh: '食品分发提醒',
          'zh-tw': '食品分發提醒',
          tl: 'Paalala sa Pamamahagi ng Gulay',
          vi: 'Nhắc nhở Phân phối Thực phẩm',
          ko: '농산물 배포 알림'
        },
        day: {
          en: 'Tomorrow',
          es: 'Mañana',
          zh: '明天',
          'zh-tw': '明天',
          tl: 'Bukas',
          vi: 'Ngày mai',
          ko: '내일'
        },
        hour: {
          en: 'In one hour',
          es: 'En una hora',
          zh: '一小时后',
          'zh-tw': '一小時後',
          tl: 'Sa isang oras',
          vi: 'Trong một giờ',
          ko: '한 시간 후'
        }
      };

      new Notification(texts.title[language], {
        body: `${type === 'day' ? texts.day[language] : texts.hour[language]}: ${event.location.baseText} at ${event.location.schedule.time.start}`,
        icon: '/favicon.ico'
      });
    }, time.getTime() - new Date().getTime());

    return () => clearTimeout(timeoutId);
  };

  const texts = {
    enable: {
      en: 'Enable Reminders',
      es: 'Activar Recordatorios',
      zh: '启用提醒',
      'zh-tw': '啟用提醒',
      tl: 'Paganahin ang mga Paalala',
      vi: 'Bật Nhắc nhở',
      ko: '알림 활성화'
    },
    enabled: {
      en: 'Reminders Enabled',
      es: 'Recordatorios Activados',
      zh: '已启用提醒',
      'zh-tw': '已啟用提醒',
      tl: 'Mga Paalala ay Pinagana',
      vi: 'Đã Bật Nhắc nhở',
      ko: '알림 활성화됨'
    }
  };

  if (!('Notification' in window)) return null;

  return (
    <button
      onClick={scheduleNotification}
      disabled={isSubscribed}
      className={`inline-flex items-center gap-2 px-3 py-1 text-sm rounded transition-colors ${
        isSubscribed 
          ? 'bg-green-500 text-white' 
          : 'bg-blue-500 hover:bg-blue-600 text-white'
      }`}
    >
      {isSubscribed ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
      <span className="hidden sm:inline">
        {isSubscribed ? texts.enabled[language] : texts.enable[language]}
      </span>
    </button>
  );
};

export default NotificationManager;