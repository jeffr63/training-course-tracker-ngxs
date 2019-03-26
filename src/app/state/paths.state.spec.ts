import { TestBed, async } from '@angular/core/testing';

import { NgxsModule, Store } from '@ngxs/store';

import { PathsState, PathsStateModel } from './paths.state';
import { PathsService } from '../services/paths.service';
import { Path } from '../services/paths';
import { stat } from 'fs';

const pathsArray: Path[] = [
  { id: 1, name: 'ABC' },
  { id: 2, name: 'DEF' },
  { id: 3, name: 'GHI' }
];

const pathsState: PathsStateModel = {
  paths: pathsArray,
  error: '',
  currentPath: null
};

describe('Paths', () => {
  let store: Store;
  let service: PathsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([PathsState])],
      providers: []
    }).compileComponents();
    store = TestBed.get(Store);
    service = TestBed.get(PathsService);
    store.reset(pathsState);
  }));

  it('should initialize values', () => {
    store
      .selectOnce((state: PathsStateModel) => state.paths)
      .subscribe((paths: Path[]) => {
        expect(paths).toEqual(pathsArray);
      });
  });

  // describe('Selector', () => {

  //   describe('getPaths', () => {
  //     it('should return an array of Paths', async(() => {
  //       expect(PathsState.getPaths(pathsState)).toEqual(pathsArray);
  //     }));
  //   });

  // });

});
