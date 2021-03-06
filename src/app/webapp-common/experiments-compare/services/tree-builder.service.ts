import {TreeNode, TreeNodeMetadata} from '../shared/experiments-compare-details.model';

export type TreeNodeTransformerFn<T = any> = (node: any, key: string, path: Array<string>, extraParams: any) => T;
export type TreeNodeMetaTransformerFn = (node: any, key: string, path: Array<string>, extraParams: any) => TreeNodeMetadata;

export class TreeBuilderService {

  constructor() {
  }

  buildTreeFromJson<V>(
    obj: { [key: string]: any },
    transformer: TreeNodeTransformerFn,
    metaTransformer?: TreeNodeMetaTransformerFn,
    transformerExtraParams?: any
  ): TreeNode<V> {
    const _metaTransformer = metaTransformer ? metaTransformer : () => ({classStyle: null});
    return {
      data    : <any>{},
      metaData: <any>{},
      parent  : null,
      children: isObject(obj) ?
        this.buildTreeFromJsonRec(obj, transformer, _metaTransformer, transformerExtraParams) :
        null
    };
  }

  private buildTreeFromJsonRec<V>(obj: { [key: string]: any },
                                  transformer: TreeNodeTransformerFn<V>,
                                  metaTransformer: TreeNodeMetaTransformerFn,
                                  transformerExtraParams?: any,
                                  level            = 0,
                                  parent: TreeNode<V> = null,
                                  path             = [],
  ): Array<TreeNode<V>> {
    return Object.keys(obj).reduce<Array<TreeNode<V>>>((accumulator, key) => {
      const _path          = path.concat([key]);
      const node: TreeNode<V> = {
        data    : transformer(obj, key, path, transformerExtraParams),
        metaData: metaTransformer(obj, key, path, transformerExtraParams),
        parent  : parent
      };
      const value          = obj[key];
      if (value != null) {
        if (typeof value === 'object' ) {
          node.children = this.buildTreeFromJsonRec(
            <any>value, transformer, metaTransformer, transformerExtraParams, level + 1, node, _path
          );
        }
      }

      return accumulator.concat(node);
    }, []);
  }


  // updateNode(node, newNode) {
  //   const parents = [];
  //   while (node.parent) {
  //     const parent = this._updateNode(node, newNode);
  //     [parent].concat(parents)
  //     node = node.parent;
  //   }
  //   // const tree = parents.map(parent => )
  //   console.log(parents);
  // }
  //
  // _updateNode(node, newNode) {
  //   const index = node.parent.children.indexOf(node);
  //   const parent = {...node.parent, children: node.parent.children[index] = newNode};
  //   return {
  //     parent: parent,
  //     index: index
  //   };
  // }

}

// TODO: move to utils.
function isObject(val) {
  return val && typeof val === 'object';
}

export const treeBuilderService = new TreeBuilderService();

