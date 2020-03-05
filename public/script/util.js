function createElemUtil(parent, id_, class_, type, isPrepend, index) {
    let parent_elem = document.getElementById(parent);
    let elem;

    switch (type) {
        case "div":
            elem = document.createElement("div");
            break;
        case "p":
            elem = document.createElement("p");
            break;
        case "button":
            elem = document.createElement("button");
            break;
        case "i":
            elem = document.createElement("i");
            break;
        case "input":
            elem = document.createElement("input");
            break;
        case "form":
            elem = document.createElement("form");
        break;
        case "label":
            elem = document.createElement("label");
        break;
        case "span":
            elem = document.createElement("span");
        break;
        default:
            elem = document.createElement("div");
    }

    if (parent_elem != undefined) {

        if (index!=undefined) {
            var afterChild =  parent_elem.children[index];
            if (afterChild) {
                parent_elem.insertBefore(elem, afterChild);
            } else {
                parent_elem.append(elem);     
            }
        } else if (isPrepend) {
            parent_elem.prepend(elem);    
        } else {
            parent_elem.append(elem);    
        }
    }

    elem.setAttribute("id", id_);
    elem.classList.add(class_);
    return elem;
}

function sortCourses(program_) {
    
    var sortedCourses_ = [];

    for (let [key, value] of Object.entries(program_.courses)) {
        var obj = JSON.parse(JSON.stringify(value));
        obj.id = key;
        sortedCourses_.push(obj);
    }

    sortedCourses_.sort(function(a, b) {
        return a.code.localeCompare(b.code);
    });

    return sortedCourses_;
}

function findCoursesInArr(array, attr, value, isInsertion) {    
    for(var i = 0; i < array.length; i ++) {
        if(array[i][attr].localeCompare(value)==0) {
            return i;
        } else if(isInsertion && array[i][attr].localeCompare(value)>0) {
            return -1*i;
        }
    }
    return -1*array.length;
}