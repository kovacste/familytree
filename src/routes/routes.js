import Login from "@/components/routes/Login";
import Home from "@/components/routes/Home";
import FamilyTree from "@/components/routes/FamilyTree";
import Register from "@/components/routes/Register";

export const routes = [
    { path: '/login', component: Login, name: 'login' },
    { path: '/registration', component: Register, name: 'registration' },
    { path: '/', component: Home },
    { path: '/familytree', component: FamilyTree },
];

