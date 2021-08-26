import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as TreeGen from 'tree-json-generator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  VgTreeNode,
  VgTreeNodeCheckboxEvent,
  VgTreeTableConfig,
} from 'projects/ngx-vengeance-lib/src/public-api';

@Component({
  selector: 'vg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ngx-vengeance-demo';
  // eslint-disable-next-line
  searchResults: any[] = [];
  // eslint-disable-next-line
  tempResults: any[] = [];
  // eslint-disable-next-line
  tree: any[] = [];
  // eslint-disable-next-line
  units: any[] = [];

  treeTableConfig!: VgTreeTableConfig;
  // eslint-disable-next-line
  map: { [key: string]: VgTreeNode<any> } = {};
  testNumber = 0;
  testForm: FormGroup = this.fb.group({
    testAuto: [
      'lozzz',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(100),
      ],
    ],
    testNumber: [
      10000000000,
      [Validators.required, Validators.min(10), Validators.max(1000000)],
    ],
    testText: [
      null,
      [Validators.required, Validators.minLength(5), Validators.email],
    ],
    testTextArea: [null, [Validators.required]],
  });

  constructor(private http: HttpClient, private fb: FormBuilder) {}

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
          key: 'id',
        },
      ],
    };
    const config = {
      node: {
        // Node fields, required
        id: '@id()', // Pipes
        parent: '@parent()',
        level: '@level()',
        name: '@randomName()',
        age: '@randomInteger(14,99)',
        email: '@randomEmail()',
        registered: '@randomBoolean(0.79)',
        child: '@child()', // Child field pointer (not required, if children are not needed)
      },
      rootNodesNumber: 7, // Number of root nodes
      childNodesNumber: [2, 5], // Number of children nodes (from 2 to 5)
      hasChildRate: 0.4, // Probability of children
      maxLevel: 3, // Max nesting
    };
    // eslint-disable-next-line
    const tree: any[] = TreeGen.generate(config);
    this.map['root'] = {
      data: { id: 'root', parent: null },
      // eslint-disable-next-line
      children: tree.map((e: any) => this.formatItem(e, 0)),
      level: -1,
      sequence: -1,
      isDisabled: {},
      isFixed: {},
      paddingBlock: {},
    };
    this.tree = this.map['root'].children;
    console.log(this.tree, this.map);
    this.http
      // eslint-disable-next-line
      .get<any[]>('https://jsonplaceholder.typicode.com/photos')
      .subscribe((next) => {
        this.searchResults = next;
        // console.log(this.searchResults);
      });
    // eslint-disable-next-line
    this.http.get('assets/units.json').subscribe((data: any) => {
      console.log(data);
      this.units = data;
    });
  }

  search(event: string): void {
    console.log('search invoke!!!');
    this.tempResults = this.searchResults.filter((e) =>
      e.title.includes(event)
    );
  }

  logCheckedNode(event: VgTreeNodeCheckboxEvent): void {
    console.log(event);
  }

  log(): void {
    console.log(this.testForm);
    if (this.testForm.invalid) {
      return;
    }
    // console.log(this.testNumber, typeof this.testNumber);
    // this.testNumber = 5;
    console.log(this.testForm.value);
  }

  log2(): void {
    console.log(this.testNumber, `type: ${typeof this.testNumber}`);
  }

  // eslint-disable-next-line
  formatItem(item: any, level: number): any {
    // eslint-disable-next-line
    const node: VgTreeNode<any> = {
      data: {
        id: item.id,
        name: item.name,
        age: item.age,
        email: `${item.email}@gmail.com`,
        registered: false,
        level: null,
        parent: item.parent,
      },
      level: level,

      children: item.child
        ? // eslint-disable-next-line
          item.child.map((childItem: any) =>
            this.formatItem(childItem, level + 1)
          )
        : [],
      expanded: true,
      isDisabled: {},
      isFixed: {},
      sequence: 0,
      paddingBlock: {},
    };
    this.map[node.data.id] = node;
    return node;
  }

  submitForm(form: FormGroup): void {
    form.markAllAsTouched();
  }
}
