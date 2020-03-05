let currentTop;
let autoScrollInterval;
let listView = false;

function createCourseGrid(courses) {

    var courseGrid = document.getElementById("course_grid");

    if (!courseGrid) {
        courseGrid = createElemUtil("container", "course_grid", "course_grid", "div");
    }

    for (let i = 0; i < courses.length; i++) {
        var courseContainer = document.getElementById(courses[i].id);

        if (!courseContainer) {
            courseContainer = createElemUtil(courseGrid.id, courses[i].id, "filter_div", "div", false, i);
            courseContainer.setAttribute("onClick", "toggleListViewCourse(this.id)");

            var main_info = createElemUtil(courseContainer.id, "main_info:" + courses[i].id, "main_info", "div");

            var course_info_block = createElemUtil(main_info.id, "course_info_block:" + courses[i].id, "course_info_block", "div");
            
            var courseInfo = createElemUtil(course_info_block.id, "course_info:" + courses[i].id, "course_info", "div");
            courseInfo.innerHTML = courses[i].code;
            courseInfo.title = courses[i].code;

            var currSeats_compact = createElemUtil(course_info_block.id, "currSeats_compact:" + courses[i].id, "currSeats_compact", "div");
            currSeats_compact.innerHTML = courses[i].currSeats;

            var courseRegRate = createElemUtil(course_info_block.id, "course_reg_rate:" + courses[i].id, "regCount_Info", "div");
            if (program.registrationCount!=0) {
                courseRegRate.innerHTML = (Number((courses[i].totalSeats-courses[i].currSeats)/parseFloat(program.registrationCount))*10).toFixed(1) + " rpp";
            } else {
                courseRegRate.innerHTML = (Number(0.0)).toFixed(1) + " rpp";
            }
            
            var seats = createElemUtil(main_info.id, "seats:" + courses[i].id, "seats", "div");
            var currSeats = createElemUtil(seats.id, "curr_seats:" + courses[i].id, "curr_seats", "p");
            currSeats.innerHTML = courses[i].currSeats;
            if (courses[i].currSeats == 0) {
                document.getElementById(courseContainer.id).style.background = "linear-gradient(68deg, #4b4646 65%, #9f5050 55%)";
            } else {
                document.getElementById(courseContainer.id).style.background = "linear-gradient(68deg, #4b4646 65%, #466c5b 55%)";
            }

            var total_seats = createElemUtil(seats.id, "total_seats:" + courses[i].id, "total_seats", "p");
            total_seats.innerHTML = "/" + courses[i].totalSeats;

             //create buttons
            var moreInfoBtn = createElemUtil(main_info.id, "course_info_moreInfo_btn:" + courses[i].id, "fa", "i");
            moreInfoBtn.classList.add("fa-info");
            moreInfoBtn.classList.add("more_info_btn");
            moreInfoBtn.setAttribute("onClick", "event.stopPropagation(); switchToCourseMoreInfoCard(this.id);");

            // create more info view
            var more_info = createElemUtil(courseContainer.id, "more_info:" + courses[i].id, "more_info", "div");
            
            var cname = createElemUtil(more_info.id, "cname:" + courses[i].id, "cname", "div");
            if (courses[i].name=="NA") {
                cname.innerHTML = "Course name: NA";
            } else {
                cname.innerHTML = courses[i].name;
                cname.title = courses[i].name;
            }
        
            var iname = createElemUtil(more_info.id, "iname:" + courses[i].id, "iname", "div");
            if (courses[i].iname=="NA") {
                iname.innerHTML = "Instructer: NA";
            } else {
                iname.innerHTML = courses[i].iname;
                iname.title = courses[i].iname;
            }

            var schedule = createElemUtil(more_info.id, "schedule:" + courses[i].id, "schedule", "div");
            var scheduleString = "";
            var isAdded = false;
            if (courses[i].days) {
                for (let [key] of Object.entries(courses[i].days)) {
                    isAdded = true;
                    scheduleString += key.toUpperCase() + "";
                }
            }
            if (isAdded) {
                schedule.innerHTML = scheduleString + " " + courses[i].days[Object.keys(courses[i].days)[0]];
                schedule.title = scheduleString + " " + courses[i].days[Object.keys(courses[i].days)[0]];
            } else {
                schedule.innerHTML = "Schedule: NA"
            }

            var loc = createElemUtil(more_info.id, "loc:" + courses[i].id, "loc", "div");
            
            if (courses[i].location == "NA") {
                loc.innerHTML = "Location: NA"    
            } else {
                loc.innerHTML = courses[i].location;
                loc.title = courses[i].location;
            }

            // create more info view button
            var crossBtn = createElemUtil(more_info.id, "course_info_cross_btn:" + courses[i].id, "fa", "i");
            crossBtn.classList.add("fa-times");
            crossBtn.classList.add("removeFFBtn");
            crossBtn.setAttribute("onClick", "event.stopPropagation(); switchToCourseInfoCard(this.id);");
            
        } else {
            
            if (courses[i].currSeats == 0) {
                document.getElementById(courseContainer.id).style.background = "linear-gradient(68deg, #4b4646 65%, #9f5050 55%)";
            } else {
                document.getElementById(courseContainer.id).style.background = "linear-gradient(68deg, #4b4646 65%, #466c5b 55%)";
            }

            document.getElementById("curr_seats:"+ courses[i].id).innerHTML = courses[i].currSeats;
            document.getElementById("total_seats:" + courses[i].id).innerHTML = "/" + courses[i].totalSeats;
            document.getElementById("currSeats_compact:" + courses[i].id).innerHTML = courses[i].currSeats;

            var courseRegRate = document.getElementById("course_reg_rate:"+ courses[i].id);
            if (program.registrationCount!=0) {
                courseRegRate.innerHTML = (Number((courses[i].totalSeats-courses[i].currSeats)/parseFloat(program.registrationCount))*10).toFixed(1) + " rpp";
            } else {
                courseRegRate.innerHTML = (Number(0.0)).toFixed(1) + " rpp";
            }
        }
    }
}

function switchToCourseEditCard (id){
    var idArr = id.split(":");
    var courseCode = idArr[idArr.length-1];

    var currSeatElem = document.getElementById("seats:" + courseCode);
    currSeatElem.style.display = "none";
    var totalSeatELem = document.getElementById("course_btn:" + courseCode);
    totalSeatELem.style.display = "none";

    var totalSeatELem = document.getElementById("seats_edit:" + courseCode);
    totalSeatELem.style.display = "flex";


    document.getElementById("course_info_edit_btn:" + courseCode).style.display = "none";

    document.getElementById("course_info_cross_btn:" + courseCode).style.display = "inline-flex";
    document.getElementById("course_info_tick_btn:" + courseCode).style.display = "inline-flex";
    document.getElementById("course_info_del_btn:" + courseCode).style.display = "inline-flex";

    var currSeatElem = document.getElementById("curr_seats:" + courseCode);
    var totalSeatELem = document.getElementById("total_seats:" + courseCode);

    var currSeatCount = parseInt(currSeatElem.innerHTML);

    var totalSeatCount = parseInt(totalSeatELem.innerHTML.substring(1, totalSeatELem.innerHTML.length));

    var currInputFeild = document.getElementById("curr_seats_edit_input:" + courseCode);
    var totalInputFeild = document.getElementById("total_seats_edit_input:" + courseCode);
    currInputFeild.value = currSeatCount;
    totalInputFeild.value = totalSeatCount;
}

function returnToCourseInfoCard(id) {
    var idArr = id.split(":");
    var courseCode = idArr[idArr.length-1];

    if (id.indexOf("tick")>1) {

        var currSeats = parseInt(document.getElementById("curr_seats_edit_input:" + courseCode).value);
        var totalSeats = parseInt(document.getElementById("total_seats_edit_input:" + courseCode).value);
        
        if (currSeats>totalSeats) {
            alert("Current available seat cannot be greater than total available seats.");
            return;
        }

        var approved = confirm("Are you sure you want to update the seats for the course \n" + program.courses[courseCode].code);

        if (approved) {
            var updates = {};
            updates['/program_01/courses/' + courseCode + "/currSeats"] = parseInt(currSeats);
            updates['/program_01/courses/' + courseCode + "/totalSeats"] = parseInt(totalSeats);
            
            ref.update(updates).then(()=> {
                var currSeatElem = document.getElementById("seats:" + courseCode);
                currSeatElem.style.display = "flex";
                var totalSeatELem = document.getElementById("course_btn:" + courseCode);
                totalSeatELem.style.display = "flex";

                var totalSeatELem = document.getElementById("seats_edit:" + courseCode);
                totalSeatELem.style.display = "none";

                document.getElementById("course_info_edit_btn:" + courseCode).style.display = "inline-flex";
                document.getElementById("course_info_cross_btn:" + courseCode).style.display = "none";
                document.getElementById("course_info_tick_btn:" + courseCode).style.display = "none";
                document.getElementById("course_info_del_btn:" + courseCode).style.display = "none";

            });
        }
    } else {
        var currSeatElem = document.getElementById("seats:" + courseCode);
        currSeatElem.style.display = "flex";
        var totalSeatELem = document.getElementById("course_btn:" + courseCode);
        totalSeatELem.style.display = "flex";

        var totalSeatELem = document.getElementById("seats_edit:" + courseCode);
        totalSeatELem.style.display = "none";

        document.getElementById("course_info_edit_btn:" + courseCode).style.display = "inline-flex";
        document.getElementById("course_info_cross_btn:" + courseCode).style.display = "none";
        document.getElementById("course_info_tick_btn:" + courseCode).style.display = "none";
        document.getElementById("course_info_del_btn:" + courseCode).style.display = "none";
    }
}

function switchToCourseMoreInfoCard(id) {
    var idArr = id.split(":");
    var courseCode = idArr[idArr.length-1];

    document.getElementById("main_info:" + courseCode).style.display = "none";
    document.getElementById("more_info:" + courseCode).style.display = "flex";
}

function switchToCourseInfoCard(id) {
    var idArr = id.split(":");
    var courseCode = idArr[idArr.length-1];

    document.getElementById("main_info:" + courseCode).style.display = "flex";
    document.getElementById("more_info:" + courseCode).style.display = "none";
}

function searchCourse() {
    let input = document.getElementById("searchField").value.toUpperCase().trim();
    filterCourseGrid(input);
}

function filterCourseGrid(SearchKey) {
    let courses = program.courses;
    for (let [key, value] of Object.entries(courses)) {
        if (key.length != 0 && ((value.code.toString().toUpperCase()).indexOf(SearchKey) <= -1
            && (value.location.toString().toUpperCase()).indexOf(SearchKey) <= -1
            && (value.name.toString().toUpperCase()).indexOf(SearchKey) <= -1
            && (value.iname.toString().toUpperCase()).indexOf(SearchKey) <= -1)) {
            document.getElementById(key).style.display = "none";
        } else {
            document.getElementById(key).style.display = "flex";
        }
    }
}

function toggleAutoScroll() {
    if (!$("#auto_scroll_switch").hasClass("auto_scroll_switch_active")) {
        $("#auto_scroll_switch").addClass("auto_scroll_switch_active");
        $("#auto_scroll_switch").css("background", "#2bb870");
        if (document.getElementById("course_grid").children) {
            var elem = document.getElementById("course_grid").children[0];
            var style = elem.currentStyle || window.getComputedStyle(elem);
            currentTop = elem.offsetTop;
            autoScrollInterval = setInterval(function() { scrollToNextRow(currentTop,3, parseInt(style.marginTop, 10)); }, 4000);
        }
    } else {
        $("#auto_scroll_switch").removeClass("auto_scroll_switch_active");
        $("#auto_scroll_switch").css("background", "#d15a5a");
        clearInterval(autoScrollInterval);
    }
}

function scrollToNextRow(currentTop_, level, marginTop) {
    var children = document.getElementById("course_grid").children;

    var prevTop = currentTop_;
    var currLevel = 0;

    for (let i=0;i<children.length;i++) {
        if (prevTop < children[i].offsetTop) {
            prevTop = children[i].offsetTop;
            currLevel++;
        }
        if (currLevel == level) {
            break;
        }
    }
    if (currLevel==level) {
        currentTop = prevTop;
        document.getElementById('course_grid_wrapper').scrollTop = currentTop - marginTop;
    } else {
        document.getElementById('course_grid_wrapper').scrollTop = children[0].offsetTop - marginTop;
        currentTop = children[0].offsetTop;
    }
}

$("#auto_scroll_block").hover(function(){
        if ($("#auto_scroll_switch").hasClass("auto_scroll_switch_active")) {
            $("#auto_scroll_switch").css("background", "#d15a5a");
        } else {
            $("#auto_scroll_switch").css("background", "#2bb870");
        }
        // $(this).css("box-shadow", "none");
    }, function(){
        if ($("#auto_scroll_switch").hasClass("auto_scroll_switch_active")) {
            $("#auto_scroll_switch").css("background", "#2bb870");
        } else {
            $("#auto_scroll_switch").css("background", "#d15a5a");
        }
        // $(this).css("box-shadow", "rgba(0, 0, 0, 0.22) 0px 0px 12px 4px, rgba(0, 0, 0, 0.19) 2px 10px 16px 0px");
});

function toggleListViewCourse(id) {
    var elem = document.getElementById(id);
    if ($(elem).hasClass("filter_div_list")) {
        $(elem).removeClass("filter_div_list");
        document.getElementById("course_reg_rate:"+ id).style.display = "block";
        document.getElementById("course_info_moreInfo_btn:"+ id).style.display = "block";
        document.getElementById("currSeats_compact:"+ id).style.display = "none";
    } else {
        $(elem).addClass("filter_div_list");
        var elem = document.getElementById("course_reg_rate:"+ id);
        document.getElementById("more_info:"+ id).style.display = "none";
        document.getElementById("main_info:"+ id).style.display = "flex";
        document.getElementById("course_reg_rate:"+ id).style.display = "none";
        document.getElementById("course_info_moreInfo_btn:"+ id).style.display = "none";
        document.getElementById("currSeats_compact:"+ id).style.display = "block";
    }
}

function toggelListView() {
    if (listView) {
        $("#list_toggle_icon").removeClass("fa-th");
        $("#list_toggle_icon").addClass("fa-list");
        $(".filter_div").removeClass("filter_div_list");
        $(".regCount_Info").css("display", "block");
        $(".more_info_btn").css("display", "block");
        $(".currSeats_compact").css("display", "none");
        listView = false;
    } else {
        $("#list_toggle_icon").removeClass("fa-list");
        $("#list_toggle_icon").addClass("fa-th");
        $(".filter_div").addClass("filter_div_list");
        $(".regCount_Info").css("display", "none");
        $(".more_info").css("display", "none");
        $(".main_info").css("display", "flex");
        $(".more_info_btn").css("display", "none");
        $(".currSeats_compact").css("display", "block");
        listView = true;
    }
}