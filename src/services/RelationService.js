import { Service } from "./Service";

class RelationService extends Service {

    getUserRelations(userId) {
        return this.get('api/User/GetUserRelations?', {
            userId,
        });
    }

    setUserRelation(relation){
        return this.post('api/User/SetUserRelation', {
            id: relation.id,
            firstUser: {
                id: relation.firstUser.id,
                firstName: relation.firstUser.firstName,
                lastName: relation.firstUser.lastName,
                birthDay: relation.firstUser.birthDay,
                birthPlace: relation.firstUser.birthPlace,
                imageUrl: relation.firstUser.imageUrl,
            },
            secondUser: {
                id: relation.secondUser.id,
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
                id: relation.firstUser.id,
                firstName: relation.firstUser.firstName,
                lastName: relation.firstUser.lastName,
                birthDay: relation.firstUser.birthDay,
                birthPlace: relation.firstUser.birthPlace,
                imageUrl: relation.firstUser.imageUrl,
            },
            secondUser: {
                id: relation.secondUser.id,
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