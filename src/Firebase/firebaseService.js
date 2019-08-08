import {
    firebaseDatabase
} from './firebaseUtils'
import {
    TableSortLabel
} from '@material-ui/core';

const documents = {
    openings: 'openings',
    subOpenings: 'subOpenings'
}


export default class FirebaseService {
    static getOpenings() {
        return new Promise((resolve, reject) => {
            let openings = []
            firebaseDatabase.collection(documents.openings).onSnapshot(snapshot => {
                snapshot.forEach(async opening => openings.push(await this.getSubOpenings(opening)))
                resolve(openings);
            })
        })
    }
    static getSubOpenings(opening) {
        let op = opening.data()
        return new Promise((resolve, reject) => {
            firebaseDatabase.collection(documents.subOpenings).where('opening', '==', opening.data().name).onSnapshot(snapshot => {
                let subOpenings = []
                snapshot.forEach(subOpening => {
                    subOpenings.push(subOpening.data())
                })
                op.subOpenings = subOpenings
                resolve(op)
            })
        })
    }
    static addOpening = (data) => firebaseDatabase.collection(documents.openings).add(data)

    static addSubOpening = (data) => firebaseDatabase.collection(documents.subOpenings).add(data)

}