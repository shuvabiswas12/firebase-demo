import { Component, OnDestroy } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { map, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy {
  title = 'firebase-demo';
  // courses = [];
  // subscription: Subscription;

  // another way to do async...
  courses$; // here $ sign means this is observable, that is why we do not need to write more code for getting subscription
  // after this we need to add a async pipe in html file after this courses$ variable.
  // this async pipe automatically update the component with the new data when any changes detected by.
  // and automatically unsubscribe the subscription when destroy the component.
  // that async pipe unwrap the observable in the html file.

  constructor(fireStore: Firestore) {
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
    this.courses$ = collectionData(collection(fireStore, 'courses'));
  }

  ngOnDestroy(): void {
    // this function calls when destroy a component
    // firebase has a memory leak problems, that is why we need to unsubscribe whenever we want
    console.log('Destroy called.');
    // this line of code should be written when we will not use async pipe and observable variable like courses$.
    // this.subscription.unsubscribe();
  }
}
