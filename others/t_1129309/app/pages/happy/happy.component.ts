import { Component,AfterViewInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { Globals } from "../../shared/global";
import { Page } from "ui/page";
import * as app from "tns-core-modules/application";

@Component({
    template: `
<ActionBar class="header">
    <NavigationButton ios.position="left" *mbIfAndroid android.systemIcon="ic_menu_back" (tap)="goBack()"></NavigationButton>
    <NavigationButton *mbIfIos visibility="collapse"></NavigationButton>
    <ActionItem *mbIfIos>
        <Image src="~/images/icon/ios_back.png" (tap)="goBack();" class="actionArrow"></Image>
    </ActionItem>
    <StackLayout class="iosActionbar" *mbIfIos>
        <mb-header [title]="title"></mb-header>
    </StackLayout>
    <StackLayout *mbIfAndroid>
        <mb-header [title]="title"></mb-header>
    </StackLayout>
</ActionBar>
<mb-side-menu *mbIfAndroid></mb-side-menu>
<GridLayout rows="*" columns="*">
    <mb-side-menu *mbIfIos></mb-side-menu>
        <StackLayout style.textAlignment="center">
            <Image src="~/images/construction.png"></Image>
            <StackLayout>
                <Button text="Back" class="happyBtn" (tap)="btnBack();" clearHistory="true" width="250"></Button>
            </StackLayout>
        </StackLayout>
    </GridLayout>
    `
})
export class HappyComponent implements AfterViewInit {
    title: string = "Construction";

    constructor(private _routerExtensions: RouterExtensions,
        public _globals: Globals,
        private page: Page) {
        if (app.ios) {
            this.page.css = "Page {background-image : none; margin-top: 0} ";
        }
    }
     ngAfterViewInit() {
        setTimeout(() => {
              this._globals.loader.hide();
        }, 1000); 
    }

    public btnBack() {
        if (!this._globals.isLoggedIn || !this._globals.isUnauthenticated) {
            this._routerExtensions.back();
        }
        else {
            let index: number;
            if (this._routerExtensions.locationStrategy._getStates().length > 1) {
                index = this._routerExtensions.locationStrategy._getStates().length - 2;
                this._routerExtensions.navigate([this._routerExtensions.locationStrategy._getStates()[index].url], { clearHistory: true });
            }
        }
    }

    public goBack() {
        this._routerExtensions.back();
    }
}
