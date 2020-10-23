export let componentTemplate = (function(){
    return `<form action="#" class="form-registration bg_dark-gradient2">
                <h1 class="form-registration__title text-light-max">
                    {{title}}
                </h1>
                {{{inputfile}}}
                {{{inputs}}}
                <div class="form-registration__input-group">
                    {{{button}}}
                    {{{loggin}}} 
                </div>
            </form>`;
})();