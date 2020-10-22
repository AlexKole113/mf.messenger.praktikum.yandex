export let inputfile = (function(){
    return `<div class="form-user-settings__ava-group">      
                <div class="form-user-settings__ava-group-upload upload-img-group">
                    <label style="background-image: url({{photo}})" class="upload-img-group__img border_light-max">
                        <input type="file" name="{{name}}" class="upload-img-group__uploader">
                    </label>
                </div>
            </div>`;
})();