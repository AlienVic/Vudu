/**

* get a page of data from server, page size is fixed and always = 25

* @param {number} pageIndex

 * @return Promise, resolved with page data when the data arrive from server

*   e.g. when called with pageIndex=0 will return records [0, 1, 2, ... 24] - 1st page of data set

*        when called with pageIndex=1 will return records [25, 26, 7, ... 49] - 2nd page of data set

* consider this function implemented and working

*/



// function getPageFromServer(pageIndex) {
//     return new Promise(function (resolve) {

//         //...
//         resolve(pageData);

//     });

// }


function getPageFromServer(pageIndex) {
    let array = []
    for (let i = 0; i <= 999; i++) {
        array.push(i)
    }
    return new Promise(function (resolve) {
        //...
        let result = array.slice(pageIndex * 25, pageIndex * 25 + 25)
        resolve(result)
    });
}

/**

* fetch any range of data from server using function getPageFromServer()

* @param {number} startIndex of data

* @param {number} endIndex of data

* @returns Promise resolved when all data arrive from server

 */

function getDataRangeFromServer(startIndex, endIndex) {
    
    return new Promise(function (resolve) {

        let startPage = parseInt(startIndex / 25)
        let endPage = parseInt(endIndex / 25)
        let result = []
        for (let i = startPage; i <= endPage; i++) {
            getPageFromServer(i).then(array => {
                result.push.apply(result, array)
            });
        }
    }).then(result => {
        resolve(result)
    });
}

getDataRangeFromServer(3, 51).then(result => console.log(result))



// sample cases:



// 1) getDataRangeFromServer(0, 1) -> returns [0, 1], calls getPageFromServer 1 time with pageIndex 0

// 2) getDataRangeFromServer(0, 49) -> returns [0..49], calls getPageFromServer 2 times  with pageIndex 0, 1

// 3) getDataRangeFromServer(5, 51) -> returns [5..51], calls getPageFromServer 3 times  with pageIndex 0, 1, 2



// 4) getDataRangeFromServer(50, 99) -> returns [50..99], calls getPageFromServer 2 times with pageIndex 2, 3

// 5) getDataRangeFromServer(55, 99) -> returns [55..99], calls getPageFromServer 2 times with pageIndex 2, 3

