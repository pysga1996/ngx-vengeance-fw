import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as TreeGen from "tree-json-generator";
import {TreeTableConfig} from "./high-performance-tree-table/tree-table-config";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {
  VgTreeNode,
  VgTreeNodeCheckboxEvent,
  VgTreeTableConfig
} from 'projects/ngx-vengeance-lib/src/public-api';

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
  units: any[] = [];
  formatItem(item: any, level: number): any {
    const node: VgTreeNode<any> = {
      data: {
        id: item.id,
        name: item.name,
        age: item.age,
        email: `${item.email}@gmail.com`,
        registered: false,
        level: null,
        parent: item.parent
      },
      level: level,
      children: item.child ? item.child.map((childItem: any) => this.formatItem(childItem, level + 1)) : [],
      expanded: true,
      isDisabled: {},
      isFixed: {},
      sequence: 0,
      paddingBlock: {},
    }
    this.map[node.data.id] = node;
    return node;
  };
  treeTableConfig!: VgTreeTableConfig;
  treeTableConfig2: TreeTableConfig | null = null;
  map: { [key: string]: VgTreeNode<any> } = {};
  testNumber = 0;
  testForm: FormGroup = this.fb.group({
    testAuto: ['lozzz', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
    testNumber: [10000000000, [Validators.required, Validators.min(10), Validators.max(1000000)]],
    testText: [null, [Validators.required, Validators.minLength(5), Validators.email]],
    testTextArea: [null, [Validators.required]]
  });

  constructor(private http: HttpClient, private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.treeTableConfig = {
      columns: [
        {
          title: 'Is registered?',
          key: 'registered',
          type: 'CHECKBOX',
          customClass: 'd-flex justify-content-center',
          checkboxVerticalCascade: true,
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
        }
      ]
    };
    this.treeTableConfig2 = {
      columns: [
        {
          title: 'Is registered?',
          key: 'registered',
          type: 'CHECKBOX',
          customClass: 'd-flex justify-content-center',
          checkboxVerticalCascade: true,
          templateRef: null
        },
        {
          title: 'ID',
          key: 'id',
          type: 'TEXT',
          customClass: 'd-flex justify-content-center',
          checkboxVerticalCascade: true,
          templateRef: null
        },
        {
          title: 'Name',
          key: 'name',
          type: 'TEXT',
          customClass: 'd-flex justify-content-center',
          checkboxVerticalCascade: true,
          templateRef: null
        },
        {
          title: 'Age',
          key: 'age',
          type: 'TEXT',
          customClass: 'd-flex justify-content-center',
          checkboxVerticalCascade: true,
          templateRef: null
        },
        {
          title: 'Email',
          key: 'id',
          type: 'TEXT',
          customClass: 'd-flex justify-content-center',
          checkboxVerticalCascade: true,
          templateRef: null
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
    this.map['root'] = {
      data: {id: 'root', parent: null},
      children: tree.map((e: any) => this.formatItem(e, 0)),
      level: -1,
      sequence: -1,
      isDisabled: {},
      isFixed: {},
      paddingBlock: {}
    };
    this.tree = this.map['root'].children;
    console.log(this.tree, this.map);
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/photos')
      .subscribe(next => {
        this.searchResults = next;
        // console.log(this.searchResults);
      });
    this.http.get("assets/units.json").subscribe((data: any) =>{
      console.log(data);
      this.units = data;
    })
  }

  search(event: string) {
    this.tempResults = this.searchResults.filter(e => e.title.includes(event));
  }

  logCheckedNode(event: VgTreeNodeCheckboxEvent) {
    console.log(event);
  }

  log() {
    console.log(this.testForm);
    if (this.testForm.invalid) {
      return;
    }
    // console.log(this.testNumber, typeof this.testNumber);
    // this.testNumber = 5;
    console.log(this.testForm.value);
  }

  log2() {
    console.log(this.testNumber, `type: ${typeof this.testNumber}`);
  }

  submitForm(form: FormGroup) {
    form.markAllAsTouched();
  }

}
