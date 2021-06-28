import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as TreeGen from "tree-json-generator";
import { TreeTableConfig, TreeNode } from 'ngx-vengeance-lib';
import {TreeNodeCheckboxEvent} from "../../../ngx-vengeance-lib/src/lib/model/tree-node-checkbox-event";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ngx-vengeance-demo';
  searchResults: any[] = [];
  tempResults: any[] = [];
  tree: any[] = [];
  static formatItem = (item: any, level: number): TreeNode<any> => ({
    data: {
      id: item.id,
      name: `${item.name}`,
      age: item.age,
      email: item.email,
      registered: item.registered,
      level: level
    },
    level: level,
    children: item.child ? item.child.map((childItem: any) => AppComponent.formatItem(childItem, level + 1)) : [],
    expanded: true,
  });
  treeTableConfig!: TreeTableConfig;

  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    this.treeTableConfig = {
      columns: [
        {
          title: 'Is registered?',
          key: 'registered',
          type: 'CHECKBOX',
          customClass: 'd-flex justify-content-center'
        },
        {
          title: 'ID',
          key: 'id',
        },
        {
          title: 'Name',
          key: 'name',
        },
        {
          title: 'Age',
          key: 'age',
        },
        {
          title: 'Email',
          key: 'id'
        },
        {
          title: 'Level',
          key: 'level',
          customClass: 'd-flex justify-content-center'
        }
      ]
    };
    const config = {
      node: { // Node fields, required
        id: "@id()", // Pipes
        parent: "@parent()",
        level: "@level()",
        name: "@randomName()",
        age: "@randomInteger(14,99)",
        email: "@randomEmail()",
        registered: "@randomBoolean(0.79)",
        child: "@child()" // Child field pointer (not required, if children are not needed)
      },
      rootNodesNumber: 7, // Number of root nodes
      childNodesNumber: [2, 5], // Number of children nodes (from 2 to 5)
      hasChildRate: 0.4, // Probability of children
      maxLevel: 3 // Max nesting
    }
    let tree: any[] = TreeGen.generate(config);
    // console.log(tree);
    this.tree = tree.map((e: any) => AppComponent.formatItem(e, 0));
    console.log(tree);
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/photos')
    .subscribe(next => {
      this.searchResults = next;
      // console.log(this.searchResults);
    });
  }

  search(event: string) {
    this.tempResults = this.searchResults.filter(e => e.title.includes(event));
  }

  logCheckedNode(event: TreeNodeCheckboxEvent) {
    console.log(event);
  }
}
