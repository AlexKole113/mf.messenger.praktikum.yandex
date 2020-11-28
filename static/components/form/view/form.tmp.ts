export let componentTemplate = (function(){
    return `<form action="#" data-form_type={{formType}} enctype="multipart/form-data" class="form-registration bg_dark-gradient2">
                <h1 class="form-registration__title text-light-max">
                    {{title}}
                </h1>
                <p class="backend-alerts"></p>
                {{{inputfile}}}
                {{{inputs}}}
                <div class="form-registration__input-group">
                    {{{button}}}
                    {{{additional}}} 
                </div>
            </form>`;
})();