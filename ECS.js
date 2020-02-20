import * as _ from 'lodash';
export var entity = function () { return ({ components: new Set() }); };
var allOf = function (entity, expected) {
    return expected
        .map(function (e) { return entity.components.has(e); })
        .reduce(function (p, c) { return p && c; });
};
var oneOf = function (e, expected) {
    return Array.from(e.components.keys())
        .map(function (c) { return expected.has(c); })
        .reduce(function (p, c) { return p || c; });
};
export var engine = function (allEntities, systems, deltaTime) {
    var entities = allEntities;
    systems.forEach(function (s) {
        var _a = _.partition(entities, function (e) {
            var all = (s.allOf) ? allOf(e, Array.from(s.allOf)) : true;
            var one = (s.oneOf) ? oneOf(e, new Set(s.oneOf)) : true;
            var noneOf = (s.noneOf) ? !oneOf(e, new Set(s.noneOf)) : true;
            return all && one && noneOf;
        }), toProcess = _a[0], others = _a[1];
        entities = s.execute(toProcess, deltaTime).concat(others);
    });
    return entities.filter(function (e) { return e.components.size > 0; });
};
//# sourceMappingURL=ECS.js.map