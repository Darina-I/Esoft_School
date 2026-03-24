function copyObject(obj, visited = new WeakMap()){
    if(obj === null || typeof obj !== 'object'){
        return obj instanceof Date ? new Date(obj): obj;
    }

    if (visited.has(obj)) {
        return visited.get(obj);
    }

    if (obj instanceof Map){
        const copyMap = new Map();
        visited.set(obj, copyMap); 
        obj.forEach((value, key) => copyMap.set(key, copyObject(value, visited)));
        return copyMap;
    }

    if (obj instanceof Set){
        const copySet = new Set();
        visited.set(obj, copySet); 
        obj.forEach((value) => copySet.add(copyObject(value, visited)));
        return copySet
    }

    if(Array.isArray(obj)){
        const copyArray = [];
        visited.set(obj, copyArray); 
        for(let i = 0; i < obj.length; i++){
            copyArray.push(copyObject(obj[i], visited));
        }
        return copyArray
    }

    const copy = {};
    visited.set(obj, copy);
    Reflect.ownKeys(obj).forEach((key) => {
        copy[key] = copyObject(obj[key], visited)
    });

    return copy;
}

const obj = {
    name: 'Дарина',
    skills: {
        design: ['Figma', 'Adobe Illustrator'],
        frontend: ['React', 'HTML', 'Tailwind'],
    },
    hobby: ['Настольные игры', 'Творчество', 'Волейбол'],
    address: { 
        city: 'Тюмень', 
        country: 'Россия', 
        newLevel: {
            name: 'level',
            level: ['1level']
        }
    }
}


console.dir(copyObject(obj), { depth: null });