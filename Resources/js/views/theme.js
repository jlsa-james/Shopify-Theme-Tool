YUI().use('view','event-custom','event-focus','array-extras', function(Y) { 
///start

Themer.ThemeView = Y.Base.create('themeView', Y.View, [], {
    
    template: Y.one('#theme-li-template').getContent(),
    
    events: {
        'div.path': { click: function(e) {
            Titanium.Platform.openURL('file://'+e.currentTarget.getContent());
        }},
        'button.remove-theme': { click: 'remove'}
    },
    
    initializer: function(e) {
        this.container = Y.Node.create('<li id="theme-' + e.model.get('id') + '"></li>');
    },
    
    render: function() {
        var container = this.container, 
            model = this.model;
        
        var viewButton = function(themeModel) {
            var args = {text: 'Preview', src: 'http://'+themeModel.get('parent_id')+'.myshopify.com/?preview_theme_id='+themeModel.get('id') };
            if('main' == themeModel.get('role')) {
                 args = {text: 'View Shop', src: 'http://'+themeModel.get('parent_id')+'.myshopify.com'};
            }

            return Y.Lang.sub("<a href='{src}' class='btn external'>{text}</a>", args);
        };

        var data = model.toJSON();
        data.viewButton = viewButton(model);
        container.setContent(Y.Lang.sub(this.template, data));
        
        return this;
    },
    
    remove: function(e) {
        console.log('ThemeView:remove');
        this.constructor.superclass.remove.call(this);
        this.model.destroy({'delete': true});
    }
    
});


///end
});
