/*************************************************************/
/* Configurations */
/*************************************************************/
Router.configure({
    layoutTemplate: 'main'
});

/*************************************************************/
/* Home */
/*************************************************************/
Router.route('/', {
    name: 'home',
    where: 'client',
    yieldRegions: {
        'app':      {to: 'main'},
        'app_home': {to: 'app'}
    }
});

/*************************************************************/
/* Discover */
/*************************************************************/
Router.route('/discover', {
    name: 'discover',
    where: 'client',
    yieldRegions: {
        'app':          {to: 'main'},
        'app_discover': {to: 'app'}
    },
    subscriptions: function() {
        this.subscribe('images.all');
        this.subscribe('networks.list');
    }
});

/*************************************************************/
/* Profile */
/*************************************************************/
Router.route('/profile', {
    name: 'profile',
    where: 'client',
    yieldRegions: {
        'app': {to: 'main'},
        'PagesProfile': {to: 'app'}
    },
    subscriptions: function() {
        this.subscribe('partups.all');
    },
    onBeforeAction: function() {
        if (!this.params._id) {
            this.params._id = Meteor.userId();
        }
        this.next();
    }
});

/*************************************************************/
/* Networks */
/*************************************************************/
Router.route('/networks', {
    name: 'networks-overview',
    where: 'client',
    yieldRegions: {
        'app':      {to: 'main'},
        'app_network_temp_overview': {to: 'app'}
    },
    subscriptions: function() {
        this.subscribe('networks.all');
    }
});

Router.route('/networks/create', {
    name: 'create-network',
    where: 'client',
    yieldRegions: {
        'modal':                   {to: 'main'},
        'modal_create_network':    {to: 'modal'}
    },
    subscriptions: function() {
        this.subscribe('networks.list');
    }
});

Router.route('/networks/:_id', {
    name: 'network-detail',
    where: 'client',
    yieldRegions: {
        'app':                      {to: 'main'},
        'app_network':              {to: 'app'},
        'app_network_partups':      {to: 'app_network'}
    },
    subscriptions: function() {
        this.subscribe('networks.one', this.params._id);
    },
    data: function() {
        return {
            networkId: this.params._id
        };
    }
});

Router.route('/networks/:_id/uppers', {
    name: 'network-uppers',
    where: 'client',
    yieldRegions: {
        'app':                  {to: 'main'},
        'app_network':          {to: 'app'},
        'app_network_uppers':   {to: 'app_network'}
    },
    subscriptions: function() {
        this.subscribe('networks.one', this.params._id);
    }
});

Router.route('/networks/:_id/invite', {
    name: 'network-invite',
    where: 'client',
    yieldRegions: {
        'modal':                   {to: 'main'},
        'modal_network_invite':    {to: 'modal'}
    },
    subscriptions: function() {
        this.subscribe('networks.one', this.params._id);
    }
});

/*************************************************************/
/* Network admin */
/*************************************************************/
Router.route('/networks/:_id/settings', {
    name: 'network-settings',
    where: 'client',
    yieldRegions: {
        'modal':                          {to: 'main'},
        'modal_network_settings':         {to: 'modal'},
        'modal_network_settings_details': {to: 'modal_network_settings'}
    },
    data: function() {
        return {
            networkId: this.params._id
        };
    }
});

Router.route('/networks/:_id/settings/uppers', {
    name: 'network-settings-uppers',
    where: 'client',
    yieldRegions: {
        'modal':                         {to: 'main'},
        'modal_network_settings':        {to: 'modal'},
        'modal_network_settings_uppers': {to: 'modal_network_settings'}
    },
    data: function() {
        return {
            networkId: this.params._id
        };
    }
});

/*************************************************************/
/* Partup detail */
/*************************************************************/
Router.route('/partups/:_id', {
    name: 'partup',
    where: 'client',
    yieldRegions: {
        'app':                {to: 'main'},
        'app_partup':         {to: 'app'},
        'app_partup_updates': {to: 'app_partup'}
    },
    data: function() {
        return {
            partupId: this.params._id
        };
    },
    onRun: function() {
        Meteor.call('partups.analytics.click', this.data().partupId);
        this.next();
    }
});

Router.route('/partups/:_id/updates/:update_id', {
    name: 'partup-update',
    where: 'client',
    yieldRegions: {
        'app':               {to: 'main'},
        'app_partup':        {to: 'app'},
        'app_partup_update': {to: 'app_partup'}
    },
    data: function() {
        return {
            partupId: this.params._id,
            updateId: this.params.update_id
        };
    }
});

Router.route('/partups/:_id/activities', {
    name: 'partup-activities',
    where: 'client',
    yieldRegions: {
        'app':                   {to: 'main'},
        'app_partup':            {to: 'app'},
        'app_partup_activities': {to: 'app_partup'}
    },
    subscriptions: function() {
        var partupId = this.params._id;
    },
    data: function() {
        return {
            partupId: this.params._id
        };
    }
});

Router.route('/partups/:_id/invite', {
    name: 'partup-invite',
    where: 'client',
    yieldRegions: {
        'modal':                  {to: 'main'},
        'modal_invite_to_partup': {to: 'modal'},
    },
    subscriptions: function() {
        // this.subscribe('users.count');
    }
});

Router.route('/partups/:_id/settings', {
    name: 'partup-settings',
    where: 'client',
    yieldRegions: {
        'modal':                  {to: 'main'},
        'modal_partup_settings': {to: 'modal'},
    },
    subscriptions: function() {
        var partupId = this.params._id;
        this.subscribe('partups.one', partupId);
    },
    data: function() {
        return {
            partupId: this.params._id
        };
    }
});

/*************************************************************/
/* Create Partup */
/*************************************************************/
Router.route('/start', {
    name: 'create',
    where: 'client',
    yieldRegions: {
        'modal':              {to: 'main'},
        'modal_create_intro': {to: 'modal'}
    }
});

Router.route('/start/details', {
    name: 'create-details',
    where: 'client',
    yieldRegions: {
        'modal':                {to: 'main'},
        'modal_create':         {to: 'modal'},
        'modal_create_details': {to: 'modal_create'}
    },
    subscriptions: function() {
        var partupId = Session.get('partials.create-partup.current-partup');
        this.subscribe('partups.one', partupId);
        this.subscribe('networks.user');
    }
});

Router.route('/start/:_id/activities', {
    name: 'create-activities',
    where: 'client',
    yieldRegions: {
        'modal':                   {to: 'main'},
        'modal_create':            {to: 'modal'},
        'modal_create_activities': {to: 'modal_create'}
    },
    subscriptions: function() {
        this.subscribe('partups.one', this.params._id);
        this.subscribe('partups.list');
    },
    data: function() {
        return {
            partupId: this.params._id
        };
    },
    action: function() {
        Session.set('partials.create-partup.current-partup', this.params._id);
        this.render();
    }
});

Router.route('/start/:_id/promote', {
    name: 'create-promote',
    where: 'client',
    yieldRegions: {
        'modal':                {to: 'main'},
        'modal_create':         {to: 'modal'},
        'modal_create_promote': {to: 'modal_create'}
    },
    subscriptions: function() {
        this.subscribe('partups.one', this.params._id);
    },
    data: function() {
        return {
            partupId: this.params._id
        };
    },
    action: function() {
        Session.set('partials.create-partup.current-partup', this.params._id);
        this.render();
    }
});

/*************************************************************/
/* Login flow */
/*************************************************************/
Router.route('/login', {
    name: 'login',
    where: 'client',
    yieldRegions: {
        'modal':       {to: 'main'},
        'modal_login': {to: 'modal'}
    }
});

/*************************************************************/
/* Password reset */
/*************************************************************/
Router.route('/forgot-password', {
    name: 'forgot-password',
    where: 'client',
    yieldRegions: {
        'modal':                {to: 'main'},
        'modal_forgotpassword': {to: 'modal'}
    }
});

Router.route('/reset-password/:token', {
    name: 'reset-password',
    where: 'client',
    yieldRegions: {
        'modal':               {to: 'main'},
        'modal_resetpassword': {to: 'modal'}
    }
});

/*************************************************************/
/* Verify Account */
/*************************************************************/
Router.route('/verify-email/:token', {
    name: 'verify-email',
    where: 'client',
    yieldRegions: {
        'app': {to: 'main'}
    },
    onBeforeAction: function() {
        Router.go('discover'); // todo: < change to profile when we have that page

        Accounts.verifyEmail(this.params.token, function(error) {
            if (error) {
                Partup.client.notify.warning(TAPi18n.__('notification-verify-mail-warning'));
            } else {
                Partup.client.notify.success(TAPi18n.__('notification-verify-mail-success'));
            }
        });
    }
});

/*************************************************************/
/* Register flow */
/*************************************************************/
Router.route('/register', {
    name: 'register',
    where: 'client',
    yieldRegions: {
        'modal':                 {to: 'main'},
        'modal_register':        {to: 'modal'},
        'modal_register_signup': {to: 'modal_register'}
    },
    subscriptions: function() {
        this.subscribe('users.count');
    }
});

Router.route('/register/details', {
    name: 'register-details',
    where: 'client',
    yieldRegions: {
        'modal':                  {to: 'main'},
        'modal_register':         {to: 'modal'},
        'modal_register_details': {to: 'modal_register'}
    }
});

/*************************************************************/
/* Close window route */
/*************************************************************/
Router.route('/close', {
    name: 'close',
    where: 'client',
    onBeforeAction: function() {
        window.close();
    }
});

/*************************************************************/
/* Route protection */
/*************************************************************/
Router.onBeforeAction(function() {
    var next = this.next;

    if (!Meteor.userId() && Meteor.isClient) {
        Partup.client.intent.go({route: 'login'}, function(success) {
            if (success) {
                next();
            } else {
                Partup.client.intent.returnToOrigin('login');
            }
        });
    } else {
        next();
    }
}, {
    only: [
        'create',
        'create-details',
        'create-activities',
        'create-contribute',
        'create-promote',
        'register-details'
    ]
});

// reset create-partup id to reset the create partup flow
Router.onBeforeAction(function() {
    if (Meteor.isClient) {
        Session.set('partials.create-partup.current-partup', undefined);
    }
    this.next();
}, {
    except: [
        'create-details',
        'create-activities',
        'create-contribute',
        'create-promote'
    ]
});

/*************************************************************/
/* Miscellaneous */
/*************************************************************/
if (Meteor.isClient) {
    Router.onBeforeAction(function() {
        window.scrollTo(0, 0);
        Partup.client.focuslayer.disable();
        this.next();
    });
}
