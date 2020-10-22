export let inputGroup = (function(){
    return `<div class="form-registration__input-group">
                <input type="{{type}}" name="{{name}}" placeholder="{{label}}" autocomplete="off" class="form-registration__input-group-item bg_dark-min border_light-min text-light-max">
                <span data-label="{{label}}" class="form-registration__input-group-item_label text-light-max">{{label}}</span>
            </div>`;
})();