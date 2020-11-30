import Login from "@/components/routes/Login";
import FamilyTree from "@/components/routes/FamilyTree";
import Register from "@/components/routes/Register";

export const routes = [
    { path: '/login', component: Login, name: 'login' },
    { path: '/registration', component: Register, name: 'registration' },
    { path: '/', component: FamilyTree },
    { path: '/familytree', component: FamilyTree },
];

