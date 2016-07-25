import {TypedRecord} from './typed.record';
import {Record} from 'immutable';


/**
 * Enables creation of a specified TypedRecord factory. Every record instance
 * produced from the returned function, will have defined all values of the
 * provided argument {obj} as the default values of an Immutable.Record. The
 * arguments required to create another instance of the TypedRecord are typed to
 * the <E>.
 *
 * This function is also necessary to decouple the Record prototype creation
 * from the instance creation, making possible to generate a TypedRecord with
 * the default intended value and from that generate multiple other Records of
 * the same type.
 *
 * The caller must provide two interfaces described below:
 *
 * <T> is the interface that is extending TypedRecord<T> and send itself
 * as its generic argument, filling the gap between the <E> (entity) and
 * the TypedRecord<T>.
 *
 * <E> is the data structure, POJO, entity, or model object that <T> MUST also
 * extend from, so that it inherits all of its properties and the {recordify}
 * method can also have a typed <E> argument.
 *
 * @param obj is a plain JS that meets the requirements described in the
 * provided <E> interface. This object is used to set the default values of the
 * Immutable.Record
 * @returns {function(E=): T} a function Factory to produce instances of a
 * TypedRecord<T>
 * @see recordify
 */
export function makeTypedFactory<E, T extends TypedRecord<T> & E>(obj: E):
  (val?: E) => T {

  const ImmutableRecord = Record(obj);
  return function TypedFactory(val: E = null): T {
    return new ImmutableRecord(val) as T;
  };
}

/**
 * Utility function to generate an Immutable.Record for the provided type.
 * The caller must provide two interfaces described below:
 *
 * <T> is the interface that is extending TypedRecord<T> and send itself
 * as its generic argument, filling the gap between the <E> (entity) and
 * the TypedRecord<T>.
 *
 * <E> is the data structure, POJO, entity, or model object that <T> MUST also
 * extend from, so that it inherits all of its properties and this {recordify}
 * method can also have a typed <E> argument.
 *
 * This Method also does not return the {TypedFactory}, which means that it will
 * be impossible to generate new instances of the same TypedFactory. This is
 * ideal for scenarios where you are performing an operation that produces
 * one instance of <T>, with either a default or current val see the following
 * params:
 *
 * @param defaultVal is the default value for the created record type.
 * @param val is an optional attribute representing the current value for this
 * Record.
 * @returns {T} that is the new created TypedRecord
 */
export function recordify<E, T extends TypedRecord<T> & E>(
  defaultVal: E,
  val: E = null): T {

  const TypedRecordFactory = makeTypedFactory<E, T>(defaultVal);
  return val ? TypedRecordFactory(val) : TypedRecordFactory();
};
