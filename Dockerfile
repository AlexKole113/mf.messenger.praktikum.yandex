# docker build -t app/messenger113:1 .    

# Базовый слой


# Копируем всё что нужно из локальной папки в образ

# При старте контейнер начнёт общаться через 80 порт
EXPOSE 80

# При старте контейнер выполнит эту команду – запустит наше приложение
CMD npm start