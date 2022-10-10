/**
 * The Std interface represents the standard default Melon
 * features and contains methods and properties focused in
 * support and utilities.
 */
declare interface Std {
    shift(): typeof _shift,
    melon: _melon,
    boolean: _boolean,
    json: _json,
    time: _time,
    system: _system,
    environment: _environment,
    process: _process
}