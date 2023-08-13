class ObserverElement {

    constructor(id, name, type, path, status) {
        this._id = id;
        this._name = name;
        this._type = type;
        this._path = path;
        this._status = status;
    }

    static fromJson(json) {
        return new ObserverElement(json.id, json.name, json.type, json.path, json.status)
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }

    get path() {
        return this._path;
    }

    set path(value) {
        this._path = value;
    }

    get status() {
        return this._status;
    }

    set status(value) {
        this._status = value;
    }
}