/*************************************************************/
/* Home */
/*************************************************************/
Router.route('/', {
    name: 'home',
    where: 'client',
    layoutTemplate: 'LayoutsMain',
    yieldRegions: {
        'PagesApp': { to: 'page' },
        'PagesHome': { to: 'app-page' }
    },
    subscriptions: function () {
        this.subscribe('notifications.user');
        this.subscribe('partups.all');
    }
});

/*************************************************************/
/* Discover */
/*************************************************************/
Router.route('/discover', {
    name: 'discover',
    where: 'client',
    layoutTemplate: 'LayoutsMain',
    yieldRegions: {
        'PagesApp': { to: 'page' },
        'PagesDiscover': { to: 'app-page' }
    },
    subscriptions: function () {
        this.subscribe('notifications.user');
        this.subscribe('partups.all');
    }
});

/*************************************************************/
/* Partup detail */
/*************************************************************/
Router.route('/partups/:_id', {
    name: 'partup-detail',
    where: 'client',
    layoutTemplate: 'LayoutsMain',
    yieldRegions: {
        'PagesApp': { to: 'page' },
        'PagesPartupDetail': { to: 'app-page' },
        'PagesPartupDetailUpdates': { to: 'partup-page' }
    },
    subscriptions: function () {
        this.subscribe('notifications.user');
        this.subscribe('partups.detail', this.params._id);
    }
});

Router.route('/partups/:_id/activities', {
    name: 'partup-detail-activities',
    where: 'client',
    layoutTemplate: 'LayoutsMain',
    yieldRegions: {
        'PagesApp': { to: 'page' },
        'PagesPartupDetail': { to: 'app-page' },
        'PagesPartupDetailActivities': { to: 'partup-page' }
    },
    subscriptions: function () {
        this.subscribe('notifications.user');
        this.subscribe('partups.detail', this.params._id);
    }
});

Router.route('/partups/:_id/budget', {
    name: 'partup-detail-budget',
    where: 'client',
    layoutTemplate: 'LayoutsMain',
    yieldRegions: {
        'PagesApp': { to: 'page' },
        'PagesPartupDetail': { to: 'app-page' },
        'PagesPartupDetailBudget': { to: 'partup-page' }
    },
    subscriptions: function () {
        this.subscribe('notifications.user');
        this.subscribe('partups.detail', this.params._id);
    }
});

Router.route('/partups/:_id/anticontract', {
    name: 'partup-detail-anticontract',
    where: 'client',
    layoutTemplate: 'LayoutsMain',
    yieldRegions: {
        'PagesApp': { to: 'page' },
        'PagesPartupDetail': { to: 'app-page' },
        'PagesPartupDetailAnticontract': { to: 'partup-page' }
    },
    subscriptions: function () {
        this.subscribe('notifications.user');
        this.subscribe('partups.detail', this.params._id);
    }
});

/*************************************************************/
/* Start Partup */
/*************************************************************/
Router.route('/start', {
    name: 'start',
    where: 'client',
    layoutTemplate: 'LayoutsMain',
    yieldRegions: {
        'PagesModal': { to: 'page' },
        'PagesStartPartupIntro': { to: 'modal-page' }
    }
});

Router.route('/start/details', {
    name: 'start-details',
    where: 'client',
    layoutTemplate: 'LayoutsMain',
    yieldRegions: {
        'PagesModal': { to: 'page' },
        'PagesStartPartup': { to: 'modal-page' },
        'PagesStartPartupDetails': { to: 'start-partup-page' }
    },
    subscriptions: function () {
        this.subscribe('partups.detail', Session.get('partials.start-partup.current-partup'));
    },
    data: function() {
        return Partups.find({_id:Session.get('partials.start-partup.current-partup')});
    }
});


Router.route('/start/:_id/activities', {
    name: 'start-activities',
    where: 'client',
    layoutTemplate: 'LayoutsMain',
    yieldRegions: {
        'PagesModal': { to: 'page' },
        'PagesStartPartup': { to: 'modal-page' },
        'PagesStartPartupActivities': { to: 'start-partup-page' }
    },
    subscriptions: function () {
        this.subscribe('partups.detail', this.params._id);
    },
    action: function() {
        Session.set('partials.start-partup.current-partup', this.params._id);
        this.render();
    }
});

Router.route('/start/:_id/contribute', {
    name: 'start-contribute',
    where: 'client',
    layoutTemplate: 'LayoutsMain',
    yieldRegions: {
        'PagesModal': { to: 'page' },
        'PagesStartPartup': { to: 'modal-page' },
        'PagesStartPartupContribute': { to: 'start-partup-page' }
    },
    subscriptions: function () {
        this.subscribe('partups.detail', this.params._id);
        this.subscribe('contributions.perpartup', this.params._id);
    },
    action: function() {
        Session.set('partials.start-partup.current-partup', this.params._id);
        this.render();
    }
});

Router.route('/start/:_id/promote', {
    name: 'start-promote',
    where: 'client',
    layoutTemplate: 'LayoutsMain',
    yieldRegions: {
        'PagesModal': { to: 'page' },
        'PagesStartPartup': { to: 'modal-page' },
        'PagesStartPartupPromote': { to: 'start-partup-page' }
    },
    subscriptions: function () {
        this.subscribe('partups.detail', this.params._id);
    },
    action: function() {
        Session.set('partials.start-partup.current-partup', this.params._id);
        this.render();
    }
});

/*************************************************************/
/* Register flow */
/*************************************************************/
Router.route('/register', {
    name: 'register',
    where: 'client',
    layoutTemplate: 'LayoutsMain',
    yieldRegions: {
        'PagesModal': { to: 'page' },
        'PagesRegister': { to: 'modal-page' },
        'PagesRegisterRequired': { to: 'register-page' }
    },
    subscriptions: function () {
        this.subscribe('users.count');
    }
});

Router.route('/register/details', {
    name: 'register-details',
    where: 'client',
    layoutTemplate: 'LayoutsMain',
    yieldRegions: {
        'PagesModal': { to: 'page' },
        'PagesRegister': { to: 'modal-page' },
        'PagesRegisterOptional': { to: 'register-page' }
    }
    /*
    ,onBeforeAction: function () {
        var user = Meteor.user();
        if (! user) {
            Router.go('register');
        }
        this.next();
    }
    */
});


/*************************************************************/
/* Styleguide */
/*************************************************************/
Router.route('/styleguide', {
    name: 'styleguide',
    where: 'client',
    layoutTemplate: 'LayoutsMain',
    yieldRegions: {
        'PagesApp': { to: 'page' },
        'PagesStyleguide': { to: 'app-page' }
    }
});
