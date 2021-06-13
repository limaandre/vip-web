import { Injectable } from '@angular/core';

// import { LoadingController } from '@ionic/angular';


@Injectable({
    providedIn: 'root'
})
export class LoadingService {

    loading = false;

    constructor() { }

    async loadingPresent() {
        if (!this.loading) {
            this.loading = true;
        }
    }

    loadingDismiss() {
        if (this.loading) {
            this.loading = false;
        }
    }
}
