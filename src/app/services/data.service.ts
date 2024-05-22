import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Pedido } from '../models/Pedido';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private firestore: AngularFirestore) {}

  getCollection(collectionName: string): Observable<any[]> {
    return this.firestore
      .collection(collectionName)
      .valueChanges({ idField: 'id' });
  }
  getDocumentById(collectionName: string, documentId: string): Observable<any> {
    return this.firestore
      .collection(collectionName)
      .doc(documentId)
      .valueChanges();
  }

  async addDocument(collectionName: string, data: Pedido): Promise<string> {
    const docRef = await this.firestore.collection(collectionName).add(data);
    const docId = docRef.id;
    data.id = docId;
    return docId;
  }

  updateDocument(
    collectionName: string,
    docId: string,
    data: any
  ): Promise<void> {
    return this.firestore.collection(collectionName).doc(docId).update(data);
  }

  deleteDocument(collectionName: string, docId: string): Promise<void> {
    return this.firestore.collection(collectionName).doc(docId).delete();
  }

  getTransacoesPorIntervaloDeDatas(
    dataInicio: Date,
    dataFim: Date
  ): Observable<Pedido[]> {
    return this.firestore
      .collection<any>('transacoes', (ref) =>
        ref.where('data', '>=', dataInicio).where('data', '<=', dataFim)
      )
      .valueChanges({ idField: 'id' })
      .pipe(
        map((docs: any[]) => {
          return docs.map((doc) => {
            doc.data = doc.data.toDate();
            return doc;
          });
        })
      );
  }
}
