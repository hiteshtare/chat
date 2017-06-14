import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { ChatsPage } from "../chats/chats";
import { GroupsPage } from "../groups/groups";
import { ProfilePage } from "../profile/profile";

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  chatsroot = ChatsPage;
  groupsroot = GroupsPage;
  profileroot = ProfilePage;

  constructor() {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad TabsPage');
  }
}