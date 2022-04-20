import { Component, OnDestroy } from '@angular/core';
import {
  collection,
  collectionData,
  collectionSnapshots,
  Firestore,
} from '@angular/fire/firestore';

import { AngularFirestore } from '@angular/fire/compat/firestore';

// import {
//   AngularFirestore,
//   AngularFirestoreDocument,
// } from '@angular/fire/compat/firestore';

import { map, Observable, Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy {
  title = 'firebase-demo';
  inputText: string = ' ';
  // courses = [];
  // subscription: Subscription;

  // another way to do async...
  courses$: Observable<any[]>; // here $ sign means this is observable, that is why we do not need to write more code for getting subscription
  // after this we need to add a async pipe in html file after this courses$ variable.
  // this async pipe automatically update the component with the new data when any changes detected by.
  // and automatically unsubscribe the subscription when destroy the component.
  // that async pipe unwrap the observable in the html file.

  constructor(private fireStore: AngularFirestore) {
    // this code for when we will not use async pipe and courses$ observable.

    // this.subscription = collectionData(collection(fireStore, 'courses'))
    //   .pipe(
    //     map((response) => {
    //       let tempArray: any = [];
    //       console.log(response);
    //       response.forEach((res) => tempArray.push(res));
    //       return tempArray;
    //     })
    //   )
    //   .subscribe({
    //     next: (response) => {
    //       this.courses = response;
    //       console.log('courses = ' + this.courses[0]['name']);
    //     },
    //   });

    // this code line for when we use async pipe and courses$ observable

    this.courses$ = fireStore
      .collection('courses', (ref) => ref.orderBy('createdAt', 'desc'))
      .valueChanges({ idField: 'eventId' });

    // this eventId is actual documents id which i pass later for update and delete that particular documents
  }

  saveData(data: HTMLInputElement) {
    console.log(data.value);
    this.fireStore
      .collection('courses')
      .add({ title: data.value, createdAt: new Date() });
    data.value = '';
  }

  saveData_v2() {
    this.fireStore
      .collection('courses')
      .add({ title: this.inputText.trim(), createdAt: new Date() });
    this.inputText = '';
  }

  update(eventId: string) {
    let courseDoc = this.fireStore.doc('courses/'.concat(eventId));
    courseDoc.update({
      title: 'Hey, champ, why are you crying? this is too much.',
    });
  }

  delete(eventId: string) {
    let courseDoc = this.fireStore.doc('courses/'.concat(eventId));
    courseDoc.delete();
  }

  submit(form: NgForm) {
    console.log(form.form.value);
  }

  ngOnDestroy(): void {
    // this function calls when destroy a component
    // firebase has a memory leak problems, that is why we need to unsubscribe whenever we want
    console.log('Destroy called.');
    // this line of code should be written when we will not use async pipe and observable variable like courses$.
    // this.subscription.unsubscribe();
  }
}
