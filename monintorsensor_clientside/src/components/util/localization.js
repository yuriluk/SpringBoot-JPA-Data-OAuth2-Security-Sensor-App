import LocalizedStrings from 'react-localization'
import {
  EMAIL_MAX_LENGTH,
  LOGIN_MAX_LENGTH,
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
  SENSOR_LOCATION_MAX_LENGTH,
  SENSOR_MODEL_MAX_LENGTH,
  SENSOR_MODEL_MIN_LENGTH,
  SENSOR_NAME_MAX_LENGTH,
  SENSOR_NAME_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH, SENSOR_DESCRIPTION_MAX_LENGTH
} from '../../constants'

export const localizedStrings = new LocalizedStrings({

  en: {
    logout: 'Logout',
    login: 'Login',
    signUp: 'Register',
    sensor: 'Sensors',
    appName: 'Sensor Portal',
    loginFormRegisterNow: ' register now!',
    alreadyRegister: 'Already registered?',
    signUpFromLoginNow: 'Login now!',
    or: 'or',
    email: 'Email',
    password: 'Password',
    emailField: 'Email',
    editSensor: 'Edit sensor',
    addSensor: 'Add sensor',

    // sensors
    sensorName: 'Name',
    model: 'Model',
    type: 'Type',
    range: 'Range',
    rangeFrom: 'Range from',
    rangeTo: 'Range to',
    unit: 'Unit',
    location: 'Location',
    description: 'Description',
    found: 'Total: ',

    //
    profile: 'Profile',
    yourName: 'Your name: ',
    yourLogin: 'Your login: ',

    /// params
    name: 'Name',
    confPassword: 'Confirmed password',
    // alerts
    alertBadEmail: 'Please input your email!',
    alertBadPassword: 'Please input your Password!',
    alertSuccessRegister: 'Thank you! You\'re successfully registered. Please Login to continue!',

    alertException: 'Sorry! Something went wrong. Please try again!',

    alertBadNameTooShort: `Name is too short (Minimum ${NAME_MIN_LENGTH} characters needed.)`,
    alertBadNameTooLong: `Name is too long (Maximum ${NAME_MAX_LENGTH} characters allowed.)`,

    alertBadLoginTooLong: `Email is too long (Maximum ${LOGIN_MAX_LENGTH} characters allowed)`,
    alertLoginEmpty: 'Email may not be empty',
    alertLoginAlreadyRegistered: 'This Email is already registered',

    alertBadEmailTooLong: `Email is too long (Maximum ${EMAIL_MAX_LENGTH} characters allowed)`,
    alertEmailEmpty: 'Email may not be empty',
    alertEmailNotValid: 'Email not valid',
    alertEmailAlreadyRegistered: 'This Email is already registered',

    alertBadPasswordTooShort: `Password is too short (Minimum ${PASSWORD_MIN_LENGTH} characters needed.)`,
    alertBadPasswordTooLong: `Password is too long (Maximum ${PASSWORD_MAX_LENGTH} characters allowed.)`,
    alertBadConfirmedPasswordNotEqual: ' Conf not equals pass',

    // sensor
    alertBadSensorNameTooShort: `Sensor name is too short (Minimum ${SENSOR_NAME_MIN_LENGTH} and maximum ${SENSOR_NAME_MAX_LENGTH} characters allowed )`,
    alertBadSensorNameTooLong: `Sensor name is too long (Minimum ${SENSOR_NAME_MIN_LENGTH} and maximum ${SENSOR_NAME_MAX_LENGTH} characters allowed )`,

    alertBadSensorModelTooShort: `Sensor model is too short (Minimum ${SENSOR_MODEL_MIN_LENGTH} and maximum ${SENSOR_MODEL_MAX_LENGTH} characters allowed )`,
    alertBadSensorModelTooLong: `Sensor model is too long (Minimum ${SENSOR_MODEL_MIN_LENGTH} and maximum ${SENSOR_MODEL_MAX_LENGTH} characters allowed )`,

    alertBadSensorRangeFromBiggerThanRangeTo: 'RangeFrom is higher than rangeTo',
    alertBadSensorRangeToSmallerThanRangeFrom: 'RangeTo is lower than rangeFrom',

    alertBadSensorTypeAbsent: 'Type should be not null',
    alertBadSensorUnitAbsent: 'Unit should be not null',

    alertBadSensorLocationText: `Sensor location is too long (Maximum ${SENSOR_LOCATION_MAX_LENGTH} characters allowed)`,
    alertBadSensorDescriptionText: `Sensor description is too long (Maximum ${SENSOR_DESCRIPTION_MAX_LENGTH} characters allowed )`,

    alertDeleteSensorSuccessfully: 'Sensor deleted successfully!',
    alertEditSensorSuccessfully: 'Sensor edited successfully!',
    alertAddSensorSuccessfully: 'Sensor added successfully!',

    alertAppName: 'Sensor Portal',
    alertLoggedOut: 'You have been logged out. Please login to create sensor.',

    alertWrongEmailOrPassword: 'Your Username or Password is incorrect. Please try again!',
    alertSuccessLogin: 'You are successfully logged in!',

    alertNoPermission: 'No permissions,Sorry!',
    alertSuccessLogOut: 'You are successfully logged out!',

    alertPageNotFound: ' The Page you\'re looking for was not found. ',
    alertPageNoPermission: 'You have no permission. Sorry!',

    // helpers
    helpForInputEmail: 'Please input your Email!',
    helpForInputPass: 'Please input your Password!',
    helpForInputSomething: 'Input something!',

    helpForPass: 'A password between 6 to 20 characters',
    helpForEmail: 'Your email',

    helpForSensorName: 'Enter sensor name',
    helpForSensorModel: 'Enter sensor model',
    helpForSensorRangeFrom: 'Enter sensor rangeFrom',
    helpForSensorRangeTo: 'Enter sensor rangeTo',
    helpForSensorLocation: 'Enter sensor location',
    helpForSensorDescription: 'Enter sensor description',
    helpSearch: 'Search...',
    chooseValue: 'Choose value',

    helpDeleteModal: 'Do you want to delete sensor?',
    helpCancel: 'Cancel',
    helpOk: 'Ok',

    helpForChooseProfileColor: 'Please pick your profile color: ',

    // footer
    footerText: ' Copyright YL-Studio 2020, All Rights Reserved.',

    // buttons
    save: 'Save',
    delete: 'Delete',
    search: 'Search',
    cancel: 'Cancel',
    chooseColor: 'Choose color',

    // Social
    useSocial: 'use your social account:',
    logInWithGoogle: 'Sign in with Google',
    logInWithGithub: 'Sign in with GitHub',
    logInWithFacebook: 'Sign in with Facebook'
    ///
  },
  ru: {
    logout: 'Выйти',
    login: 'Войти',
    signUp: 'Зарегистрироваться',
    sensor: 'Сенсоры',
    appName: 'Мониторинг сенсоров',
    loginFormRegisterNow: ' зарегистрируйся сейчас!',
    alreadyRegister: 'Уже зарегистрированы?',
    signUpFromLoginNow: 'Залогиньтесь!',
    or: 'или',
    email: 'Электронная почта',
    password: 'Пароль',
    emailField: 'Электронная почта',
    editSensor: 'Изменить сенсор',
    addSensor: 'Добавить сенсор',

    // sensors
    sensorName: 'Назание',
    model: 'Модель',
    type: 'Тип',
    range: 'Диапазон',
    rangeFrom: 'Ниж. граница',
    rangeTo: 'Верх. граница',
    unit: 'Ед. изм',
    location: 'Расположение',
    description: 'Описание',
    found: 'Всего: ',

    //

    profile: 'Профиль',
    yourName: 'Ваше имя: ',
    yourLogin: 'Ваш логин: ',

    /// params
    name: 'Имя',
    confPassword: 'Подтвержденный пароль',

    // alerts
    alertBadEmail: 'Пожалуйста, введите Вашу электронную почту',
    alertBadPassword: 'Пожалуйста, введите Ваш пароль',
    alertSuccessRegister: 'Спасибо! Вы успешно зарегистрированы. Пожалуйста, залогиньтесь для продолжения!',

    alertException: 'Извините! Что-то пошло не так. Попробуйте еще раз!',

    alertRebootPage: 'Перезагрузить? Возможно, внесенные изменения не сохранятся.',

    alertBadNameTooShort: `Имя очень короткое! (Минимум ${NAME_MIN_LENGTH} символов)`,
    alertBadNameTooLong: `Имя очень длинное (Максимум ${NAME_MAX_LENGTH} символов)`,

    alertBadLoginTooLong: `Логин очень длинный (Максимум ${LOGIN_MAX_LENGTH} символов)`,
    alertLoginEmpty: 'Логин не может быть пустым',
    alertLoginAlreadyRegistered: 'Этот логин уже зарегистрирован',

    alertBadEmailTooLong: `Email очень длинный (Максимум ${EMAIL_MAX_LENGTH} символов)`,
    alertEmailEmpty: 'Email не может быть пустым',
    alertEmailNotValid: 'Email не валидный',
    alertEmailAlreadyRegistered: 'Этот Email уже зарегистрирован',

    alertBadPasswordTooShort: `Пароль очень короткий! (Минимум ${PASSWORD_MIN_LENGTH} символов)`,
    alertBadPasswordTooLong: `Пароль очень длинный (Максимум  ${PASSWORD_MAX_LENGTH} символов)`,
    alertBadConfirmedPasswordNotEqual: ' Подтвержденный пароль не соответсвует паролю',

    // sensors

    alertBadSensorNameTooShort: `Название очень короткое (Минимум ${SENSOR_NAME_MIN_LENGTH}  символов;\nМаксимум ${SENSOR_NAME_MAX_LENGTH} символов)`,
    alertBadSensorNameTooLong: `Название очень длинное (Минимум ${SENSOR_NAME_MIN_LENGTH} символов;\nМаксимум ${SENSOR_NAME_MAX_LENGTH} символов)`,

    alertBadSensorModelTooShort: `Модель очень короткая(Minimum ${SENSOR_MODEL_MIN_LENGTH} символов;\nМаксимум ${SENSOR_MODEL_MAX_LENGTH} символов )`,
    alertBadSensorModelTooLong: `Модель очень длинная (Минимум ${SENSOR_MODEL_MIN_LENGTH} символов;\nМаксимум ${SENSOR_MODEL_MAX_LENGTH} символов)`,

    alertBadSensorRangeFromBiggerThanRangeTo: 'Нижняя граница диапазона выше верхней границы диапазона',
    alertBadSensorRangeToSmallerThanRangeFrom: 'Верхняя граница диапазона ниже нижней границы диапазона',

    alertBadSensorTypeAbsent: 'Тип не должен быть пустым',
    alertBadSensorUnitAbsent: 'Еденица измерения не должена быть пустой',

    alertBadSensorLocationText: `Локация очень длинная (Максимум ${SENSOR_LOCATION_MAX_LENGTH} символов)`,
    alertBadSensorDescriptionText: `Описание очень длинное (Максимум ${SENSOR_DESCRIPTION_MAX_LENGTH} символов )`,

    alertDeleteSensorSuccessfully: 'Сенсор удален успешно!',
    alertEditSensorSuccessfully: 'Сенсор изменен успешно!',
    alertAddSensorSuccessfully: 'Сенсор добавлен успешно!',

    alertAppName: 'Мониторинг сенсоров',
    alertLoggedOut: 'Вы вышли из системы. Пожалуйста, залогиньтесь для этого действия.',

    alertWrongEmailOrPassword: 'Ваш логин или пароль неверны. Пожалуйста, попробуйте еще раз!',
    alertSuccessLogin: 'Успешный вход!',

    alertNoPermission: 'У вас нет прав, сори!',
    alertSuccessLogOut: 'Успешный выход!',

    alertPageNotFound: ' Страница не найдена! ',
    alertPageNoPermission: ' У вас нет прав, сори!',

    /// helpers
    helpForInputEmail: 'Пожалуйста введите ваш Email!',
    helpForInputPass: 'Пожалуйста введите ваш пароль!',
    helpForInputSomething: 'Пожалуйста введите что-нибудь!',

    helpForPass: 'Пароль должен быть от 6 до 20 символов',
    helpForEmail: 'Ваша электронная почта',

    helpForSensorName: 'Введите назание сенсора',
    helpForSensorModel: 'Введите модель сенсора',
    helpForSensorRangeFrom: 'Введите нижний диапазон сенсора',
    helpForSensorRangeTo: 'Введите верхний диапазон сенсора',
    helpForSensorLocation: 'Введите локацию сенсора',
    helpForSensorDescription: 'Введите описание сенсора',
    helpSearch: 'Поиск...',
    chooseValue: 'Выберите значение',

    helpDeleteModal: 'Вы уверены, что хотите удалить сенсор?',
    helpCancel: 'Отменить',
    helpOk: 'Да',

    helpForChooseProfileColor: 'Выберите цвет для вашего профиля: ',

    // footer
    footerText: 'YL-Studio 2020. Все права защищены',

    // buttons
    save: 'Сохранить',
    delete: 'Удалить',
    search: 'Поиск',
    cancel: 'Отменить',
    chooseColor: 'Выбрать цвет',

    // Social
    useSocial: 'используйте свой аккаунт в соц сетях:',
    logInWithGoogle: 'Зарегистрировастья через Гугл',
    logInWithGithub: 'Зарегистрировастья через ГитХаб',
    logInWithFacebook: 'Зарегистрировастья через Фейсбук'
    ///
  }
})
