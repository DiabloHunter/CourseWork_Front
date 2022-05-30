export default {
    data(){
        return {
            ua:{
                navbar:{
                    welcomeMessage:"Привет",
                    browse:"Перехід",
                    home:"Головна",
                    products:"Товари",
                    categories:"Категорії",
                    accounts:"Акаунт",
                    profile:"Профіль",
                    orders:"Замовлення",
                    wishlist:"Список бажаного",
                    signUp:"Реєстрація",
                    signIn:"Авторизація",
                    signOut:"Вихід",
                    loggedOut:"До побачення!",
                    dataBase:"База даних",
                    backup:"Резервне копіювання",
                    restore:"Відновлення",
                    checkPrices:"Перевірка"
                },
                home:{
                    startShopping:"Почати!",
                    slogan:"Простий спосіб робити свою роботу!",
                    topCategories:"Топ категорії",
                    topProducts:"Топ продукти",
                },
                signIn:{
                    title:"Авторизація",
                    password:"Пароль",
                    continue:"Продовжити",
                    loginSuccessful:"Авторизація успішна!",
                    incorrect:"Неправильний логін чи пароль!"
                },
                signUp:{
                    title:"Реєстрація",
                    firstName:"Ім'я",
                    lastName:"Прізвище",
                    password:"Пароль",
                    confirmPassword:"Підтвердить пароль",
                    createAccount:"Створити акаунт",
                    registrationSuccessful:"Реєстрація успішна! Будь ласка авторизуйтесь!",
                    userAlreadyExist:"Користувач з таким логіном вже існує!",
                    passwordsDontMatch:"Паролі не збігаються!"
                },
                profile:{
                    title:"Профіль",
                    firstName:"Ім'я",
                    lastName:"Прізвище",
                    password:"Пароль",
                    confirmPassword:"Підтвердить пароль",
                    update:"Оновити",
                    delete:"Видалити",
                    updatedProfile:"Профіль успішно змінено!",
                    passwordsDontMatch:"Паролі не збігаються!"
                },
                cart:{
                    title:"Кошик",
                    perUnit:"за одиницю",
                    quantity:"Кількість",
                    removeFromCart:"Видалити з кошику",
                    total:"Загалом",
                    confirmOrder:"Підтвердити замовлення",
                },
                orders:{
                    title:"Замовлення",
                },
                orderBox:{
                    goods:"товарів",
                },
                orderDetails:{
                    title:"Товари в замовленні",
                    perUnit:"за одиницю",
                    quantity:"Кількість",
                    total:"Загалом",
                },
                checkout:{
                    title:"Ви будете перенаправлені на сторінку оплати",
                    info:"Під час оплати використовуйте номер картки 4242 4242 4242 4242 і введіть випадкову\n" +
                        "     дату та CVV (3 цифри)",
                    makePayment:"Створити замовлення",
                },
                category:{
                    title:"Наші категорії",
                    addCategory:"Додати категорію",
                    order:"Порядок",
                    name:"Назва",
                    description:"Опис",
                    submit:"Підтвердити",
                },
                categoryBox:{
                    edit:"Редагувати",
                },
                addCategory: {
                    title:"Додати категорію",
                    name:"Назва",
                    description:"Опис",
                    image:"URL Зображення",
                    submit:"Підтвердити",
                    addedCategory:"Категорія успішно додана!",
                },
                editCategory: {
                    title:"Змінити категорію",
                    name:"Назва",
                    description:"Опис",
                    image:"URL Зображення",
                    submit:"Підтвердити",
                    delete:"Видалити",
                    updatedCategory:"Категорія успішно змінена!",
                    deletedCategory: "Категорія успішно видалена!",
                },
                product:{
                    title:"Наші товари",
                    addProduct:"Додати товар",
                    order:"Порядок",
                    name:"Назва",
                    description:"Опис",
                    price:"Ціна",
                    submit:"Підтвердити",
                },
                addProduct:{
                    title:"Додати новий товар",
                    category:"Категорія",
                    code:"Код",
                    name:"Назва",
                    description:"Опис",
                    price:"Ціна($)",
                    image:"URL Зображенн",
                    minimalSales:"Мінімальна кількість продажу",
                    maximumSales:"Максимальна кількість продажу",
                    addGood:"Додати товар",
                    addedProduct:"Товар успішно додано!",
                },
                editProduct:{
                    title:"Редагувати товар",
                    category:"Категорія",
                    code:"Код",
                    name:"Назва",
                    description:"Опис",
                    price:"Ціна($)",
                    image:"URL Зображення",
                    minimalSales:"Мінімальна кількість продажу",
                    maximumSales:"Максимальна кількість продажу",
                    submit:"Підтвердити",
                    delete:"Видалити",
                    updatedProduct:"Товар успішно змінено!",
                    deletedProduct:"Товар успішно видалено!"
                },
                productDetails: {
                    quantity:"Кількість",
                    addToCart:"Додати до кошику",
                    wishlistAdd:"Додати до списку бажаного",
                    wishlistAdded:"Додано до списку бажаного",
                    pleaseLoginToAddToWishlist:"Будь ласка, авторизуйтесь щоб додати до списку бажаного!",
                    pleaseLoginToAddToCart:"Будь ласка, авторизуйтесь щоб додати до кошику!",
                    deletedFromWishlist:"Видалено зі списку бажаного!",
                    addedToWishlist:"Додано до списку бажаного!",
                    addedToCart:"Товар додано до кошику!",
                },
                productBox: {
                    edit:"Редагувати",
                },
                wishlist: {
                    title:"Ваш список бажаного",
                },
            }
        }
    }
}