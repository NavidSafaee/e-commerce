let xAxisData = [
    {
        "name": 'Jan',
        "Sale": 112_000
    },
    {
        "name": 'Feb',
        "Sale": 99_000
    },
    {
        "name": 'Mar',
        "Sale": 12_090
    },
    {
        "name": 'Apr',
        "Sale": 99_000
    },
    {
        "name": 'May',
        "Sale": 54_000
    },
    {
        "name": 'Jun',
        "Sale": 85_000
    },
    {
        "name": 'Jul',
        "Sale": 34_000
    },
    {
        "name": 'Agu',
        "Sale": 18_598
    },
    {
        "name": 'Sep',
        "Sale": 0
    },
    {
        "name": 'Oct',
        "Sale": 73_078
    },
    {
        "name": 'Nov',
        "Sale": 12_900
    },
    {
        "name": 'Dev',
        "Sale": 97_000
    },
]

const newMembers = [
    {
        id: 1,
        username: 'Mohammad Amin',
        title: 'Web Developer',
        img: 'images/amin.jpg'
    },
    {
        id: 2,
        username: 'Sasan Moq',
        title: 'Seo Eng',
        img: 'images/sasan.jpg'
    },
    {
        id: 3,
        username: 'Zahra Agayi',
        title: 'Weblog',
        img: 'images/zahra.jpg'
    },
    {
        id: 4,
        username: 'Qadir Yolme',
        title: 'Hacker',
        img: 'images/qadir.jpg'
    },
]

const transactions = [
    {
        id: 1,
        customer: 'Qadir Yolme',
        date: '12 Jun 2022',
        amount: 123,
        status: 'Approved',
        img: 'images/qadir.jpg'
    },
    {
        id: 2,
        customer: 'Amin Saeedi',
        date: '23 Jul 2022',
        amount: 123,
        status: 'Declined',
        img: 'images/amin.jpg'
    },
    {
        id: 3,
        customer: 'Mohammad Qol',
        date: '28 May 2022',
        amount: 123,
        status: 'Pending',
        img: 'images/mmd.jpg'
    },
    {
        id: 4,
        customer: 'Sasan Moq',
        date: '1 Feb 2022',
        amount: 123,
        status: 'Approved',
        img: 'images/sasan.jpg'
    },
]

let userRows = [
    {
        id: 1,
        username: 'Qadir Yolme',
        avatar: 'images/qadir.jpg',
        status: 'active',
        transaction: '$129.52',
        email: 'amin@gmail.com',
        comments:'thank for your good productsLorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, error.'
    },
    {
        id: 2,
        username: 'Amin Saeedi',
        avatar: 'images/amin.jpg',
        status: 'non-active',
        transaction: '$110',
        email: 'amin@gmail.com',
        comments:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus dicta similique nihil iusto beatae! Qui soluta modi sunt accusamus inventore.'


    },
    {
        id: 3,
        username: 'Sasan Moq',
        avatar: 'images/sasan.jpg',
        status: 'active',
        transaction: '$98',
        email: 'amin@gmail.com',
        comments:'thes sofa are so comfortable and you will have good slip with that'


    },
    {
        id: 4,
        username: 'Zahra Agayi',
        avatar: 'images/zahra.jpg',
        status: 'active',
        transaction: '$0',
        email: 'amin@gmail.com',
        comments:'thes sofa are so comfortable and you will have good slip with that'

    },
    {
        id: 5,
        username: 'Hamze mohammadi',
        avatar: 'images/hamze.jpg',
        status: 'active',
        transaction: '$55.98',
        email: 'amin@gmail.com',
        comments:'thes sofa are so comfortable and you will have good slip with that'

    }
]

let products = [
    {
        id: 1,
        title: 'Asus',
        avatar: '../images/3.jpg',
        price: 890,
        date:'2003/08/23',
        received:true,
        producterN:'AliBaba'
    },
    {
        id: 2,
        title: 'Acer',
        avatar: '../images/1.jpg',
        price: 890,
        date:'2003/08/23',
        received:true,
        producterN:'HeydarBaba'

    },
    {
        id: 3,
        title: 'HP',
        avatar: '../images/2.jpg',
        price: 890,
        date:'2003/08/23',
        received:false,
        producterN:'Yashar'

    },
    {
        id: 4,
        title: 'Dell',
        avatar: '../images/4.jpg',
        price: 890,
        date:'2003/08/23',
        received:true,
        producterN:'AliBaba'
    }
]

export { xAxisData, newMembers, transactions, userRows, products }