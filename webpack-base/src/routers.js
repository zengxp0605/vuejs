export default [
    {
        path: '/',
        name: 'login',
        component: require('./components/Login')
    }, {
        path: '/login',
        name: 'login',
        component: require('./components/Login')
    }, {
        path: '/room/:userId',
        name: 'room',
        component: require('./components/Room')
    }, {
        path: '/table/:roomId/:userId',
        name: 'table',
        component: require('./components/Table')
    }, {
        path: '*',
        component: require('./components/Login')
    }, {
        path: '/home',
        name: 'home',
        component: require('./components/Home')
    }
]
