class User {

    constructor() {

        let protected_data;

        this.getData = function () {
            console.log( protected_data );
        }

        this.setData = function ( obj ) {
            protected_data = obj;
            return this;
        }

    }

}