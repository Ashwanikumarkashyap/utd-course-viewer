const ref = firebase.database().ref();

let programRef = null;
let program = null;
let sortedCourses = []

firebase.auth().onAuthStateChanged(function(user_) {
    if (user_) {
        // User is successfully signed in.
        user = user_

        if (programRef) {
            programRef.child('registrationCount').off();    
            programRef.child('courses').off();
        }

        programRef = ref.child('program_01')

        programRef.child('registrationCount').on('value', function() {
            programRef.once("value", progSnap => {
                if (program != null) {
                    program = progSnap.val();
                    sortedCourses = sortCourses(program);
                    createCourseGrid(sortedCourses);
                }
            });
        });
        
        programRef.child('courses').on('child_removed', function(childSnapshot) {
            $(document.getElementById(childSnapshot.key)).remove();
        });


        $("body").css("height", "100vh");
        document.getElementById("login_block_wrapper").style.display = "none";
        
        // retrive the data
        programRef.once("value", snap => {
            document.getElementById("logout_btn").style.display = "block";
            
            document.getElementById("title_block").style.justifyContent = "left";
            document.getElementById("title").innerHTML = "Courses Offered";
            document.getElementById("search_block").style.display = "flex";
            document.getElementById("course_grid_wrapper").style.display = "block";

            program = snap.val();
            sortedCourses = sortCourses(program)
            createCourseGrid(sortedCourses);
            
            var containerElem = document.getElementById("container");
            containerElem.style.height = "calc( 100% - "+ (containerElem.offsetTop) + "px )";
            var footerElem = document.getElementById("footer");
            containerElem.style.padding = "0px 20px " + (footerElem.offsetHeight) + "px 20px";

            programRef.child('courses').on('child_added', function(childSnap) {
                if (program.courses[childSnap.key] === undefined) {
                    program.courses[childSnap.key] = childSnap.val();
                    var insertIndex = findCoursesInArr(sortedCourses, 'code', childSnap.val().code, true);
                    insertIndex = -1*(insertIndex);
                    var obj = JSON.parse(JSON.stringify(childSnap.val()));
                    obj.id = childSnap.key;
                    sortedCourses.splice(insertIndex, 0, obj);        
                    // update the UI
                    createCourseGrid(sortedCourses);
                }        
            });
        });
        
    } else {
        // No user is signed in.

        if (programRef) {
            programRef.child('registrationCount').off();    
            programRef.child('courses').off();
            programRef = null;
        }

        $("body").css("height", "auto");
        
        document.getElementById("logout_btn").style.display = "none";
        document.getElementById("search_block").style.display = "none";
        document.getElementById("black_overlay").style.display = "none";
        document.getElementById("about_block").style.display = "none";

        document.getElementById("title_block").style.justifyContent = "center";
        document.getElementById("title").innerHTML = "Welcome to UT Dallas Course Viewer";
        
        var courseGrid = document.getElementById("course_grid_wrapper");
        if (courseGrid) {
            courseGrid.style.display = "none";
        }
        ui.start('#firebaseui-auth-container', uiConfig);        
    }
});

$(window).resize(function() {
    var containerElem = document.getElementById("container");
    containerElem.style.height = "calc( 100% - "+ (containerElem.offsetTop) + "px )";
    var footerElem = document.getElementById("footer");
    containerElem.style.padding = "0px 20px " + (footerElem.offsetHeight) + "px 20px";
});