import { Impl } from '../../../../../core/implementation-decorator';
import { TGenericIteratorStruct } from '../iterator-struct';
import { TraitAs } from '../../../../../build-in/others/trait-as/trait-as';


@Impl()
export class ImplTraitAsForIteratorStruct<GSelf extends TGenericIteratorStruct> extends TraitAs<GSelf> {
}
