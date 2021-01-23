import { Service } from "./Service";

class RelationService extends Service {

    getUserRelations(userId) {
        /*return this.get('api/User/GetUserRelations?', {
            userId,
        });*/
        console.log(userId);
        return new Promise((resolve) => {
            resolve({ data: [
                    { firstName: 'Name', lastName: 'NAMME', birthPlace: 'HELY', birthDay: 'IDO',  id: 1, pid: 0, tags: ["blue"], name: "King George VI", img: "https://cdn.balkan.app/shared/f1.png"},
                    { firstName: 'Name', lastName: 'NAMME', birthPlace: 'HELY', birthDay: 'IDO',  id: 2, pid: 1, tags: ["partner"], name: "Queen Elizabeth", title: "The Queen Mother", img: "https://cdn.balkan.app/shared/f2.png" },
                    { firstName: 'Name', lastName: 'NAMME', birthPlace: 'HELY', birthDay: 'IDO',  id: 3, pid: 1, tags: ["blue"],  ppid: 2, name: "Queen Elizabeth II", img: "https://cdn.balkan.app/shared/f5.png"},
                    { firstName: 'Name', lastName: 'NAMME', birthPlace: 'HELY', birthDay: 'IDO',  id: 4, pid: 3, tags: ["left-partner"], name: "Prince Philip", title: "Duke of Edinburgh", img: "https://cdn.balkan.app/shared/f3.png"},
                ]
            });
        });
    }

    setUserRelation(relation, userId){
        console.log(relation)
        return this.post('api/User/SetUserRelation', {
            id: relation.id,
            CreationUserId: userId,
            firstUser: {
                id: parseInt(relation.firstUser.id, 10),
                firstName: relation.firstUser.firstName,
                lastName: relation.firstUser.lastName,
                birthDay: relation.firstUser.birthDay,
                birthPlace: relation.firstUser.birthPlace,
                imageUrl: relation.firstUser.imageUrl,
            },
            secondUser: {
                id: parseInt(relation.secondUser.id, 10),
                firstName: relation.secondUser.firstName,
                lastName: relation.secondUser.lastName,
                birthDay: relation.secondUser.birthDay,
                birthPlace: relation.secondUser.birthPlace,
                imageUrl: relation.secondUser.imageUrl,
            },
            relationTypeId: relation.relationTypeId,
        })
    }

    removeUserRelation(relation) {
        return this.post('api/User/RemoveUserRelation', {
            id: relation.id,
            firstUser: {
                id: parseInt(relation.firstUser.id, 10),
                firstName: relation.firstUser.firstName,
                lastName: relation.firstUser.lastName,
                birthDay: relation.firstUser.birthDay,
                birthPlace: relation.firstUser.birthPlace,
                imageUrl: relation.firstUser.imageUrl,
            },
            secondUser: {
                id: parseInt(relation.secondUser.id, 10),
                firstName: relation.secondUser.firstName,
                lastName: relation.secondUser.lastName,
                birthDay: relation.secondUser.birthDay,
                birthPlace: relation.secondUser.birthPlace,
                imageUrl: relation.secondUser.imageUrl,
            },
            relationTypeId: relation.relationTypeId,
        })
    }

    getRaltionTypes() {
        return this.get('api/User/GetRelationTypes?')
    }
}

export const relationService = new RelationService('/api/');