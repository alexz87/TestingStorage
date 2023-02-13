/**
 * --- VARIABLES ---
 */
const screen_width = $('body').width()

let st_input = $('#storage-input')
let st_slider = $('#storage-slider')
let st_input_change = ''

let tr_input = $('#transfer-input')
let tr_slider = $('#transfer-slider')
let tr_input_change = ''

// ba
let ba_gb = $('#ba-gb')
let ba_res = $('#ba-res')
let ba_min_pay = 7
let ba_st = 0.005
let ba_tr = 0.01

// bu
let bu_gb = $('#bu-gb')
let bu_res = $('#bu-res')
let bu_st = $('input[name="bunny"]:checked').val()
let bu_max_pay = 10
let bu_tr = 0.01
function getBu(id) {
    bu_st = $(id).val()
    goOn()
}

// sc
let sc_gb = $('#sc-gb')
let sc_res = $('#sc-res')
let sc_st = $('input[name="scaleway"]:checked').val()
let sc_min_max = 75
let sc_tr = 0.02 // to 75 free
function getSc(id) {
    sc_st = $(id).val()
    goOn()
}

// vu
let vu_gb = $('#vu-gb')
let vu_res = $('#vu-res')
let vu_min_pay = 5
let vu_st = 0.01
let vu_tr = 0.01

// myMath
function myMath(storage, transfer, condition, name) {
    let in_storage = st_input.val()
    let in_transfer = tr_input.val()
    if (name == 'sc') {
        if (in_storage <= condition) {
            storage = 0
        } else {
            in_storage = in_storage - condition
        }
        if (in_transfer <= condition) {
            transfer = 0
        } else {
            in_transfer = in_transfer - condition
        }
    }
    let res = (storage * in_storage) +(transfer * in_transfer)
    if (name == 'ba') {
        if (res < condition) {
            res = condition
        }
    }
    if (name == 'bu') {
        if (res > condition) {
            res = condition
        }
    }
    if (name == 'vu') {
        if (res < condition) {
            res = condition
        }
    }
     
    return res
}

function goOn() {

    let arr = [
        [myMath(ba_st, ba_tr, ba_min_pay, 'ba'), ba_gb, "#ff2800", ba_res],
        [myMath(bu_st, bu_tr, bu_max_pay, 'bu'), bu_gb, "#ff9900", bu_res],
        [myMath(sc_st, sc_tr, sc_min_max, 'sc'), sc_gb, "#bf40bf", sc_res],
        [myMath(vu_st, vu_tr, vu_min_pay, 'vu'), vu_gb, "#0080ff", vu_res]
    ]
    let min = arr[0][0]
    let id = arr[0][1]
    let color = arr[0][2]
    for (let m = 0; m < arr.length; m++) {
        if (min > arr[m][0]) {
            min = arr[m][0]
            id = arr[m][1]
            color = arr[m][2]
        }
        arr[m][1].css({"background" : "#999"})
        if (!Number.isInteger(arr[m][0])) {
            arr[m][0] = arr[m][0].toFixed(2)
        }
        if (screen_width < 768) {
            arr[m][1].css({"height" : arr[m][0] + '%'})
            arr[m][3].html('$' + arr[m][0])
        } else {
            arr[m][1].css({"width" : arr[m][0] + '%'})
            arr[m][3].html('$' + arr[m][0])
        }
    }
    id.css({"background" : color})
}

$(document).ready(function() {
    goOn()
})

st_input.change(function() {
    st_input_change = $(this).val()
    st_slider.html(st_input_change)
    goOn()
})

tr_input.change(function() {
    tr_input_change = $(this).val()
    tr_slider.html(tr_input_change)
    goOn()
})