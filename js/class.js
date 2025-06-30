/**
 * Менеджер пользователей
 */
class UsersManager {
    constructor(){
        const data = localStorage.getItem("newUsers");
        /**
         * Массив пользователей
         * @type {Array<User>}
         */
        this.data = data ? JSON.parse(data) : [];
    }

    /**
     * Добавление нового пользователя
     * @param {string} surname фамилия
     * @param {string} name имя
     * @param {string} pathronymic отчество
     * @param {string} email почта
     * @param {string} phone телефон
     * @param {string} birth дата рождения
     * @param {string} city город
     * @param {string} password пароль
     * @returns {User}
     */
    add(
        surname,
        name, 
        pathronymic,
        phone,
        email, 
        birth,
        city,
        password,
    ){
        const user = {
            "id": this.data.length + 1,
            "surname": surname,
            "name": name,
            "pathronymic": pathronymic,
            "phone": phone,
            "email": email, //замена юзернейма на эмейл
            "birth": birth,
            "city": city,
            "password": password,
            "IDheart": [], //замена курсов на сердца
        }
        this.data.push(user);
        this.save();
        return user;
    }

    /**
     * Изменение данных пользователя
     * @param {number} id пользователя для изменений
     * @param {User} data данные пользователя 
     */
    edit (
        id,
        data,
    ) {
        this.data[id-1] = data;
        this.save();
    }

    /**
     * Получение текущего пользователя
     * @return {number | null}
     */
    getCurrentUser (){
        return localStorage.getItem("newCurrentUser");
    }

    /**
     * Получение данных текущего пользователя
     * @returns {User | null}
     */
    readCurrentUser(){
        const id = this.getCurrentUser();
        if (id) return this.readId(id);
        else return null;
    }

    /**
     * Получение данных пользователя по ID пользователя
     * @param {number} id нужного пользователя
     * @returns {User | null}
     */
    readId(
        id,
    ){
        const data = this.data.find(item => item.id == id);
        return data; 
    }

    /**
     * Сохранение данных
     */
    save(){
        localStorage.setItem("newUsers", JSON.stringify(this.data));
    }

    /**
     * Установка текущего пользователя
     * @param {number} id 
     */
    setCurrentUser (
        id,
    ){
        localStorage.setItem("newCurrentUser", JSON.stringify(id));
    }

    /**
     * Вывод данных пользователей в консоль
     */
    console(){
        console.table(this.data);
    }
};





/**
 * Класс по работе с пользователем
 * @param {User} данные пользователя
 */
class User {
    constructor(data){
        /**
         * Id
         * @type {number}
         */
        this.id = data.id;
         /**
         * Фамилия
         * @type {string}
         */
        this.surname = data.surname;
        /**
         * Имя
         * @type {string}
         */
        this.name = data.name;
        /**
         * Отчество
         * @type {string}
         */
        this.pathronymic = data.pathronymic;
        /**
        * Телефон
        * @type {string}
        */
       this.phone = data.phone;
        /**
         * Почта
         * @type {string}
         */
        this.email = data.email;
        /**
         * Дата рождения
         * @type {string}
         */
        this.birth = data.birth;
        /**
         * Город
         * @type {string}
         */
        this.city = data.city;
        /**
         * Пароль
         * @type {string}
         */
        this.password = data.password;
        /**
         * ID понравившихся продуктов
         * @type {[number]}
         */
        this.IDheart = data.IDheart || [];
    }

    /**
     * Добавление курса
     * @param {number} id курса для добавления
    */
    addCourse(
        id,
    ) {
        this.IDheart.push(id);
    }

    /**
     * Проверка наличия курса
     * @param {number} id курса для проверки
     * @returns {boolean}
    */
    checkCourse(
        id,
    ) {
        return this.IDheart.some(item => item === id);
    }

    /**
     * Вывод данных пользователя в консоль
     */
    console(){
        console.table(
            {
                "id": this.id,
                "surname": this.surname,
                "name": this.name,
                "pathronymic": this.pathronymic,
                "phone": this.phone,
                "email": this.email,
                "birth": this.birth,
                "city": this.city,
                "password": this.password,
                "IDheart": this.IDheart,
            }
        )
    }
};