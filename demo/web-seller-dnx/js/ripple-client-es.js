/*!
 * Ripple Client v2a727dd
 * Copyright (c) 2014 Ripple Labs, Inc.
 * Licensed under the ISC license.
 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var types = __webpack_require__(1);

	// Load app modules
	__webpack_require__(2);
	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(5);
	__webpack_require__(6);
	__webpack_require__(7);
	__webpack_require__(8);
	__webpack_require__(9);
	__webpack_require__(10);
	__webpack_require__(11);
	__webpack_require__(12);
	__webpack_require__(13);
	__webpack_require__(14);
	__webpack_require__(15);
	__webpack_require__(16);
	__webpack_require__(17);
	__webpack_require__(18);
	__webpack_require__(19);
	__webpack_require__(20);
	__webpack_require__(21);
	__webpack_require__(22);
	__webpack_require__(23);
	__webpack_require__(24);
	__webpack_require__(25);
	__webpack_require__(26);
	__webpack_require__(27);
	__webpack_require__(28);
	__webpack_require__(29);
	__webpack_require__(30);
	__webpack_require__(31);
	__webpack_require__(32);

	__webpack_require__(33);
	__webpack_require__(34);
	__webpack_require__(35);
	__webpack_require__(36);
	__webpack_require__(37);
	__webpack_require__(38);

	// Angular module dependencies
	var appDependencies = [
	  'ng',
	  'ngRoute',
	  // Controllers
	  'app',
	  'navbar',
	  // Services
	  'id',
	  'tracker',
	  'appManager',
	  // Directives
	  'charts',
	  'effects',
	  'events',
	  'fields',
	  'formatters',
	  'directives',
	  'validators',
	  'datalinks',
	  'errors',
	  // Filters
	  'filters',
	  'ui.bootstrap'
	];

	// Load tabs
	var tabdefs = [
	  __webpack_require__(39),
	  __webpack_require__(40),
	//  require('../tabs/migrate'),
	  __webpack_require__(41),
	  __webpack_require__(42),
	  __webpack_require__(43),
	//  require('../tabs/contacts'),
	//  require('../tabs/exchange'),
	  __webpack_require__(44),
	//  require('../tabs/trust'),
	//  require('../tabs/send'),
	//  require('../tabs/trade'),
	//  require('../tabs/advanced'),
	  __webpack_require__(45),
	  __webpack_require__(46),
	  __webpack_require__(47),
	  __webpack_require__(48),
	  __webpack_require__(49),
	  __webpack_require__(50)

	  // Hidden tabs
	//  require('../tabs/apps'),
	//  require('../tabs/su')
	];

	// Prepare tab modules
	var tabs = tabdefs.map(function (Tab) {
	  var tab = new Tab();

	  if (tab.angular) {
	    var module = angular.module(tab.tabName, tab.angularDeps);
	    tab.angular(module);
	    appDependencies.push(tab.tabName);
	  }

	  return tab;
	});

	var app = angular.module('rp', appDependencies);

	// Global reference for debugging only (!)
	var rippleclient = window.rippleclient = {};
	rippleclient.app = app;
	rippleclient.types = types;

	// Install basic page template
	angular.element('body').prepend(__webpack_require__(54)());

	app.config(['$routeProvider', '$injector', function ($routeProvider, $injector) {
	  // Set up routing for tabs
	  _.each(tabs, function (tab) {
	    if ("function" === typeof tab.generateHtml) {
	      var template = tab.generateHtml();

	      var config = {
	        tabName: tab.tabName,
	        tabClass: 't-'+tab.tabName,
	        pageMode: 'pm-'+tab.pageMode,
	        mainMenu: tab.mainMenu,
	        template: template
	      };

	      $routeProvider.when('/'+tab.tabName, config);

	      if (tab.extraRoutes) {
	        _.each(tab.extraRoutes, function(route) {
	          $.extend({}, config, route.config);
	          $routeProvider.when(route.name, config);
	        });
	      }

	      _.each(tab.aliases, function (alias) {
	        $routeProvider.when('/'+alias, config);
	      });
	    }
	  });

	  // Language switcher
	  $routeProvider.when('/lang/:language', {
	    redirectTo: function(routeParams, path, search){
	      lang = routeParams.language;

	      if (lang == 'es') lang = '';

	      if (!store.disabled) {
	        store.set('ripple_language',lang ? lang : '');
	      }

	      // problem?
	      // reload will not work, as some pages are also available for guests.
	      // Logout will show the same page instead of showing login page.
	      // This line redirects user to root (login) page
	      var port = location.port.length > 0 ? ":" + location.port : "";
	      location.href = location.protocol + '//' + location.hostname  + port + location.pathname;
	    }
	  });

	  $routeProvider.otherwise({redirectTo: '/balance'});
	}]);

	app.run(['$rootScope', '$injector', '$compile', '$route', '$routeParams', '$location',
	         function ($rootScope, $injector, $compile, $route, $routeParams, $location)
	{
	  // This is the web client
	  $rootScope.client = 'web';
	  $rootScope.productName = 'DineX';

	  // Global reference for debugging only (!)
	  if ("object" === typeof rippleclient) {
	    rippleclient.$scope = $rootScope;
	    rippleclient.version = $rootScope.version =
	      angular.element('#version').text();
	  }

	  // Helper for detecting empty object enumerations
	  $rootScope.isEmpty = function (obj) {
	    return angular.equals({},obj);
	  };

	  // if url has a + or %2b then replace with %20 and redirect
	  if (_.isArray($location.$$absUrl.match(/%2B|\+/gi)))
	    window.location = $location.$$absUrl.replace(/%2B|\+/gi, '%20');

	  var scope = $rootScope;
	  $rootScope.$route = $route;
	  $rootScope.$routeParams = $routeParams;
	  $('#main').data('$scope', scope);

	  // If using the old "amnt" parameter rename it "amount"
	  var amnt = $location.search().amnt;
	  if (amnt) {
	    $location.search("amnt", null);
	    $location.search("amount", amnt);
	  }

	  // Once the app controller has been instantiated
	  // XXX ST: I think this should be an event instead of a watch
	  scope.$watch("app_loaded", function on_app_loaded(oldval, newval) {
	    $('nav a').click(function() {
	      if (location.hash == this.hash) {
	        scope.$apply(function () {
	          $route.reload();
	        });
	      }
	    });
	  });
	}]);

	// Some backwards compatibility
	if (!Options.blobvault) {
	  Options.blobvault = Options.BLOBVAULT_SERVER;
	}

	if ("function" === typeof angular.resumeBootstrap) {
	  angular.resumeBootstrap();

	  angular.resumeBootstrap = function() {
	    return false;
	  };
	}


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Base58Utils = __webpack_require__(51);

	var RippleAddress = (function () {
	  function append_int(a, i) {
	    return [].concat(a, i >> 24, (i >> 16) & 0xff, (i >> 8) & 0xff, i & 0xff)
	  }

	  function firstHalfOfSHA512(bytes) {
	    return sjcl.bitArray.bitSlice(
	      sjcl.hash.sha512.hash(sjcl.codec.bytes.toBits(bytes)),
	      0, 256
	    );
	  }

	  function SHA256_RIPEMD160(bits) {
	    return sjcl.hash.ripemd160.hash(sjcl.hash.sha256.hash(bits));
	  }

	  return function (seed) {
	    this.seed = Base58Utils.decode_base_check(33, seed);

	    if (!this.seed) {
	      throw "Invalid seed."
	    }

	    this.getAddress = function (seq) {
	      seq = seq || 0;

	      var private_gen, public_gen, i = 0;
	      do {
	        private_gen = sjcl.bn.fromBits(firstHalfOfSHA512(append_int(this.seed, i)));
	        i++;
	      } while (!sjcl.ecc.curves.c256.r.greaterEquals(private_gen));

	      public_gen = sjcl.ecc.curves.c256.G.mult(private_gen);

	      var sec;
	      i = 0;
	      do {
	        sec = sjcl.bn.fromBits(firstHalfOfSHA512(append_int(append_int(public_gen.toBytesCompressed(), seq), i)));
	        i++;
	      } while (!sjcl.ecc.curves.c256.r.greaterEquals(sec));

	      var pubKey = sjcl.ecc.curves.c256.G.mult(sec).toJac().add(public_gen).toAffine();

	      return Base58Utils.encode_base_check(0, sjcl.codec.bytes.fromBits(SHA256_RIPEMD160(sjcl.codec.bytes.toBits(pubKey.toBytesCompressed()))));
	    };
	  };
	})();

	exports.RippleAddress = RippleAddress;



/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * APP
	 *
	 * The app controller manages the global scope.
	 */

	var util = __webpack_require__(76),
	    events = __webpack_require__(77),
	    rewriter = __webpack_require__(55),
	    genericUtils = __webpack_require__(56),
	    Amount = ripple.Amount;

	var module = angular.module('app', []);

	module.controller('AppCtrl', ['$rootScope', '$compile', 'rpId', 'rpNetwork',
	                              'rpKeychain', 'rpTxQueue', 'rpAppManager', '$location',
	                              function ($scope, $compile, $id, $net,
	                                        keychain, txQueue, appManager, $location)
	{
	  reset();

	  var account;

	  // For announcement banner

	  $scope.showAnnouncement = store.get('announcement');

	  if('undefined' === typeof $scope.showAnnouncement) $scope.showAnnouncement = true;

	  $scope.dismissBanner = function() {
	    store.set('announcement', false);
	    $scope.showAnnouncement = store.get('announcement');
	  }

	  // Global reference for debugging only (!)
	  if ("object" === typeof rippleclient) {
	    rippleclient.id = $id;
	    rippleclient.net = $net;
	    rippleclient.keychain = keychain;
	  }

	  function reset()
	  {
	    $scope.apps = [];
	    $scope.account = {};
	    $scope.lines = {};
	    $scope.offers = {};
	    $scope.events = [];
	    $scope.history = [];
	    $scope.balances = {};
	    $scope.loadState = [];
	    $scope.unseenNotifications = {
	      count: 0
	    };
	  }

	  // TODO fix this
	  $scope.reset = function(){
	    reset();
	  }

	  var myHandleAccountEvent;
	  var myHandleAccountEntry;

	  function handleAccountLoad(e, data)
	  {
	    var remote = $net.remote;

	    account = data.account;

	    reset();

	    var accountObj = remote.account(data.account);

	    // We need a reference to these functions after they're bound, so we can
	    // unregister them if the account is unloaded.
	    myHandleAccountEvent = handleAccountEvent;
	    myHandleAccountEntry = handleAccountEntry;
	    $scope.loadingAccount = true;

	    accountObj.on('transaction', myHandleAccountEvent);
	    accountObj.on('entry', function(data){
	      $scope.$apply(function () {
	        $scope.loadingAccount = false;
	        myHandleAccountEntry(data);
	      });
	    });

	    accountObj.entry(function (err, entry) {
	      if (err) {
	        $scope.loadingAccount = false;
	        $scope.loadState['account'] = true;
	      }
	    });

	    // Ripple credit lines
	    remote.request_account_lines(data.account)
	      .on('success', handleRippleLines)
	      .on('error', handleRippleLinesError).request();

	    // Transactions
	    remote.request_account_tx({
	      'account': data.account,
	      'ledger_index_min': -1,
	      'descending': true,
	      'limit': Options.transactions_per_page
	    })
	      .on('success', handleAccountTx)
	      .on('error', handleAccountTxError).request();

	    // Outstanding offers
	    remote.request_account_offers(data.account)
	      .on('success', handleOffers)
	      .on('error', handleOffersError).request();

	    loadB2r();
	  }

	  function handleAccountUnload(e, data)
	  {
	    var remote = $net.remote;
	    var accountObj = remote.account(data.account);
	    accountObj.removeListener('transaction', myHandleAccountEvent);
	    accountObj.removeListener('entry', myHandleAccountEntry);
	  }

	  function handleRippleLines(data)
	  {
	    $scope.$apply(function () {
	      $scope.lines = {};

	      for (var n=0, l=data.lines.length; n<l; n++) {
	        var line = data.lines[n];

	        // XXX: This reinterpretation of the server response should be in the
	        //      library upstream.
	        line = $.extend({}, line, {
	          limit: ripple.Amount.from_json({value: line.limit, currency: line.currency, issuer: line.account}),
	          limit_peer: ripple.Amount.from_json({value: line.limit_peer, currency: line.currency, issuer: account}),
	          balance: ripple.Amount.from_json({value: line.balance, currency: line.currency, issuer: account})
	        });

	        $scope.lines[line.account+line.currency] = line;
	        updateRippleBalance(line.currency, line.account, line.balance);
	      }
	      console.log('lines updated:', $scope.lines);

	      $scope.$broadcast('$balancesUpdate');

	      $scope.loadState['lines'] = true;
	    });
	  }

	  function handleRippleLinesError(data)
	  {
	    $scope.$apply(function () {
	      $scope.loadState['lines'] = true;
	    });
	  }

	  function handleOffers(data)
	  {
	    $scope.$apply(function () {
	      data.offers.forEach(function (offerData) {
	        var offer = {
	          seq: +offerData.seq,
	          gets: ripple.Amount.from_json(offerData.taker_gets),
	          pays: ripple.Amount.from_json(offerData.taker_pays),
	          flags: offerData.flags
	        };

	        updateOffer(offer);
	      });
	      console.log('offers updated:', $scope.offers);
	      $scope.$broadcast('$offersUpdate');

	      $scope.loadState['offers'] = true;
	    });
	  }

	  function handleOffersError(data)
	  {
	    $scope.$apply(function () {
	      $scope.loadState['offers'] = true;
	    });
	  }

	  function handleAccountEntry(data)
	  {
	    var remote = $net.remote;
	    $scope.account = data;

	    // XXX Shouldn't be using private methods
	    var server = remote._getServer();

	    // As per json wire format convention, real ledger entries are CamelCase,
	    // e.g. OwnerCount, additional convenience fields are lower case, e.g.
	    // reserve, max_spend.
	    var ownerCount  = $scope.account.OwnerCount || 0;
	    $scope.account.reserve_base = server._reserve(0);
	    $scope.account.reserve = server._reserve(ownerCount);
	    $scope.account.reserve_to_add_trust = server._reserve(ownerCount+1);
	    $scope.account.reserve_low_balance = $scope.account.reserve.product_human(2);

	    // Maximum amount user can spend
	    var bal = Amount.from_json(data.Balance);
	    $scope.account.max_spend = bal.subtract($scope.account.reserve);

	    $scope.loadState['account'] = true;

	    // Transaction queue
	    txQueue.checkQueue();
	  }

	  function handleAccountTx(data)
	  {
	    $scope.$apply(function () {
	      $scope.tx_marker = data.marker;

	      if (data.transactions) {
	        data.transactions.reverse().forEach(function (e, key) {
	          processTxn(e.tx, e.meta, true);
	        });

	        $scope.$broadcast('$eventsUpdate');
	      }

	      $scope.loadState['transactions'] = true;
	    });
	  }

	  function handleAccountTxError(data)
	  {
	    $scope.$apply(function () {
	      $scope.loadState['transactions'] = true;
	    });
	  }

	  function handleAccountEvent(e)
	  {
	    $scope.$apply(function () {
	      processTxn(e.transaction, e.meta);
	      $scope.$broadcast('$eventsUpdate');
	    });
	  }

	  /**
	   * Process a transaction and add it to the history table.
	   */
	  function processTxn(tx, meta, is_historic)
	  {
	    var processedTxn = rewriter.processTxn(tx, meta, account);

	    if (processedTxn) {
	      var transaction = processedTxn.transaction;

	      // Update account
	      if (processedTxn.accountRoot) {
	        handleAccountEntry(processedTxn.accountRoot);
	      }

	      // Show status notification
	      if (processedTxn.tx_result === "tesSUCCESS" &&
	          transaction &&
	          !is_historic) {

	        $scope.$broadcast('$appTxNotification', {
	          hash:tx.hash,
	          tx: transaction
	        });
	      }

	      // Add to recent notifications
	      if (processedTxn.tx_result === "tesSUCCESS" &&
	          transaction) {
	        // Only show specific transactions
	        if ('received' === transaction.type) {
	          // Is it unseen?
	          if (processedTxn.date > ($scope.userBlob.data.lastSeenTxDate || 0)) {
	            processedTxn.unseen = true;
	            $scope.unseenNotifications.count++;
	          }

	          $scope.events.unshift(processedTxn);
	        }
	      }

	      // TODO Switch to txmemo field
	      appManager.getAllApps(function(apps){
	        _.each(apps, function(app){
	          var historyProfile;
	          if (historyProfile = app.findProfile('history')) {
	            historyProfile.getTransactions($scope.address, function(err, history){
	              history.forEach(function(tx){
	                tx.app = app;
	                if (processedTxn.hash === tx.hash) {
	                  processedTxn.details = tx;
	                }
	              });
	            });
	          }
	        });
	      });

	      // Add to history
	      $scope.history.unshift(processedTxn);

	      // Update Ripple lines
	      if (processedTxn.effects && !is_historic) {
	        updateLines(processedTxn.effects);
	      }

	      // Update my offers
	      if (processedTxn.effects && !is_historic) {
	        // Iterate on each effect to find offers
	        processedTxn.effects.forEach(function (effect) {
	          // Only these types are offers
	          if (_.contains([
	            'offer_created',
	            'offer_funded',
	            'offer_partially_funded',
	            'offer_cancelled'], effect.type))
	          {
	            var offer = {
	              seq: +effect.seq,
	              gets: effect.gets,
	              pays: effect.pays,
	              deleted: effect.deleted,
	              flags: effect.flags
	            };

	            updateOffer(offer);
	          }
	        });

	        $scope.$broadcast('$offersUpdate');
	      }
	    }
	  }

	  function updateOffer(offer)
	  {
	    if (offer.flags && offer.flags === ripple.Remote.flags.offer.Sell) {
	      offer.type = 'sell';
	      offer.first = offer.gets;
	      offer.second = offer.pays;
	    } else {
	      offer.type = 'buy';
	      offer.first = offer.pays;
	      offer.second = offer.gets;
	    }

	    if (!offer.deleted) {
	      $scope.offers[""+offer.seq] = offer;
	    } else {
	      delete $scope.offers[""+offer.seq];
	    }
	  }

	  function updateLines(effects)
	  {
	    if (!$.isArray(effects)) return;

	    var balancesUpdated;

	    $.each(effects, function () {
	      if (_.contains([
	        'trust_create_local',
	        'trust_create_remote',
	        'trust_change_local',
	        'trust_change_remote',
	        'trust_change_balance',
	        'trust_change_no_ripple'], this.type))
	      {
	        var effect = this,
	            line = {},
	            index = effect.counterparty + effect.currency;

	        line.currency = effect.currency;
	        line.account = effect.counterparty;
	        line.flags = effect.flags;
	        line.no_ripple = !!effect.noRipple; // Force Boolean

	        if (effect.balance) {
	          line.balance = effect.balance;
	          updateRippleBalance(effect.currency,
	                                    effect.counterparty,
	                                    effect.balance);
	          balancesUpdated = true;
	        }

	        if (effect.deleted) {
	          delete $scope.lines[index];
	          return;
	        }

	        if (effect.limit) {
	          line.limit = effect.limit;
	        }

	        if (effect.limit_peer) {
	          line.limit_peer = effect.limit_peer;
	        }

	        $scope.lines[index] = $.extend($scope.lines[index], line);
	      }
	    });

	    if (balancesUpdated) $scope.$broadcast('$balancesUpdate');
	  }

	  function updateRippleBalance(currency, new_account, new_balance)
	  {
	    // Ensure the balances entry exists first
	    if (!$scope.balances[currency]) {
	      $scope.balances[currency] = {components: {}, total: null};
	    }

	    var balance = $scope.balances[currency];

	    if (new_account) {
	      balance.components[new_account] = new_balance;
	    }

	    $(balance.components).sort(function(a,b){
	      return a.compareTo(b);
	    });

	    balance.total = null;
	    for (var counterparty in balance.components) {
	      var amount = balance.components[counterparty];
	      balance.total = balance.total ? balance.total.add(amount) : amount;
	    }

	    // Try to identify the gateway behind this balance
	    // TODO be more smart doing requests, one app may have multiple currencies
	    appManager.getApp(new_account, function(err, app){
	      if (err) {
	        console.warn(err);
	        return;
	      }

	      var gateway = {
	        app: app,
	        inboundBridge: app.getInboundBridge(currency)
	      };

	      balance.components[new_account].gateway = gateway;

	      // User's gateway account
	      app.findProfile('account').getUser($scope.address, function(err, user){
	        if (err) {
	          console.warn(err);
	          return;
	        }

	        gateway.user = user;

	        // Get inbound bridge instructions
	        gateway.inboundBridge.getInstructions($scope.address,function(err, instructions){
	          if (err) {
	            console.warn(err);
	            return;
	          }

	          // TODO ...
	          // if (!user.verified && gateway.inboundBridge.currencies[0].limit && balance) {
	          //   gateway.inboundBridge.limit = gateway.inboundBridge.currencies[0].limit - balance.components[new_account].to_human();
	          // }

	          gateway.inboundBridge.limit = $scope.B2R.currencies[0].limit;

	          gateway.inboundBridge.instructions = instructions;
	        });
	      });
	    });
	  }

	  /**
	   * Integrations
	   */
	  function loadB2r() {
	    $scope.loadState.B2RApp = false;
	    $scope.loadState.B2RInstructions = false;

	    // B2R
	    if ('web' === $scope.client) {
	      appManager.loadApp(Options.b2rAddress, function(err, app){
	        if (err) {
	          console.warn('Error loading app', err.message);
	          return;
	        }

	        $scope.B2RApp = app;

	        $scope.B2R = app.getInboundBridge('BTC');

	        appManager.save(app);

	        app.refresh = function() {
	          app.findProfile('account').getUser($scope.address, function(err, user){
	            $scope.loadState.B2RApp = true;

	            if (err) {
	              console.log('Error', err);
	              return;
	            }

	            $scope.B2R.active = user;

	            // TODO ...
	            // if (!user.verified && $scope.B2R.currencies[0].limit && $scope.balances['BTC']) {
	            //   $scope.B2R.limit = $scope.B2R.currencies[0].limit - $scope.balances['BTC'].components['rhxULAn1xW9T4V2u67FX9pQjSz4Tay2zjZ'].to_human();
	            // } else {
	            $scope.B2R.limit = $scope.B2R.currencies[0].limit;
	            // }

	            // Do the necessary trust
	            var trust = _.findWhere($scope.B2R.currencies, {currency: 'BTC'});
	            $scope.B2R.trust(trust.currency,trust.issuer);

	            // Get pending transactions
	            $scope.B2R.getPending($scope.address, function(err, pending){
	              // TODO support multiple pending transactions
	              $scope.pending = pending[0];
	            });

	            // Get deposit instructions
	            $scope.B2R.getInstructions($scope.address,function(err, instructions){
	              if (err) {
	                return;
	              }

	              $scope.B2R.instructions = instructions;
	              $scope.loadState.B2RInstructions = true;
	            });
	          });
	        };

	        var watcher = $scope.$watch('address', function(address){
	          if (!address) return;

	          app.refresh();
	          watcher();
	        });

	        // Required fields
	        $scope.B2RSignupFields = app.findProfile('account').getFields();
	      });
	    }
	  }

	  $scope.currencies_all = __webpack_require__(57);

	  // prefer currency full_names over whatever the local storage has saved
	  var storeCurrenciesAll = store.get('ripple_currencies_all') || [];

	  // run through all currencies
	  _.each($scope.currencies_all, function(currency) {

	    // find the currency in the local storage
	    var allCurrencyHit = _.where(storeCurrenciesAll, {value: currency.value})[0];

	    // if the currency already exists in local storage, updated only the name
	    if (allCurrencyHit) {
	      allCurrencyHit.name = currency.name;
	    } else {
	      // else append the currency to the storeCurrenciesAll array
	      storeCurrenciesAll.push(currency);
	    }
	  });

	  $scope.currencies_all = storeCurrenciesAll;

	  // Personalized default pair set
	  if (!store.disabled && !store.get('ripple_pairs_all')) {
	    store.set('ripple_pairs_all',__webpack_require__(58));
	  }

	  var pairs_all = store.get('ripple_pairs_all');
	  var pairs_default = __webpack_require__(58);
	  $scope.pairs_all = genericUtils.uniqueObjArray(pairs_all, pairs_default, 'name');

	  function compare(a, b) {
	    if (a.order < b.order) return 1;
	    if (a.order > b.order) return -1;
	    return 0;
	  }

	  // sort currencies and pairs by order
	  $scope.currencies_all.sort(compare);

	  function compare_last_used(a, b) {
	    var time_a = a.last_used || a.order || 0;
	    var time_b = b.last_used || b.order || 0;
	    if (time_a < time_b) return 1;
	    if (time_a > time_b) return -1;
	    return 0;
	  }
	  $scope.pairs_all.sort(compare_last_used);

	  $scope.currencies_all_keyed = {};
	  _.each($scope.currencies_all, function(currency){
	    $scope.currencies_all_keyed[currency.value] = currency;
	  });

	  $scope.$watch('currencies_all', function(){
	    if (!store.disabled) {
	      store.set('ripple_currencies_all',$scope.currencies_all);
	    }
	  }, true);

	  $scope.$watch('pairs_all', function(){
	    if (!store.disabled) {
	      store.set('ripple_pairs_all',$scope.pairs_all);
	    }
	  }, true);

	  $scope.pairs = $scope.pairs_all.slice(1);

	  $scope.app_loaded = true;

	  // Moved this to the run block
	  // Nav links same page click fix
	  // $('nav a').click(function(){
	  //   if (location.hash == this.hash) {
	  //     location.href="#/";
	  //     location.href=this.href;
	  //   }
	  // });

	  $scope.$on('$idAccountLoad', function (e, data) {
	    // Server is connected
	    if ($scope.connected) {
	      handleAccountLoad(e, data);
	    }

	    // Server is not connected yet. Handle account load after server response.
	    $scope.$on('$netConnected', function(){
	      if ($.isEmptyObject($scope.account)) {
	        handleAccountLoad(e, data);
	      }
	    });
	  });

	  $scope.$on('$idAccountUnload', handleAccountUnload);

	  // XXX: The app also needs to handle updating its data when the connection is
	  //      lost and later re-established. (... or will the Ripple lib do that for us?)
	  var removeFirstConnectionListener =
	        $scope.$on('$netConnected', handleFirstConnection);
	  function handleFirstConnection() {
	    removeFirstConnectionListener();
	  }

	  $net.listenId($id);
	  $net.init();
	  $id.init();
	  appManager.init();

	  $scope.logout = function () {
	    $id.logout();
	    location.href="#/login";
	    location.reload();
	  };

	  /**
	   * Testing hooks
	   */
	  this.reset                  =  reset;
	  this.handleAccountLoad      =  handleAccountLoad;
	  this.handleAccountUnload    =  handleAccountUnload;
	  this.handleRippleLines      =  handleRippleLines;
	  this.handleRippleLinesError =  handleRippleLinesError;
	  this.handleOffers           =  handleOffers;
	  this.handleOffersError      =  handleOffersError;
	  this.handleAccountEntry     =  handleAccountEntry;
	  this.handleAccountTx        =  handleAccountTx;
	  this.handleAccountTxError   =  handleAccountTxError;
	  this.handleAccountEvent     =  handleAccountEvent;
	  this.processTxn             =  processTxn;
	  this.updateOffer            =  updateOffer;
	  this.updateLines            =  updateLines;
	  this.updateRippleBalance    =  updateRippleBalance;
	  this.compare                =  compare;
	  this.handleFirstConnection  =  handleFirstConnection;
	}]);


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * NAVBAR
	 *
	 * The navbar controller manages the bar at the top of the screen.
	 */

	var Amount = ripple.Amount,
	    rewriter = __webpack_require__(55);

	var module = angular.module('navbar', []);

	module.controller('NavbarCtrl', ['$scope', '$element', '$compile', 'rpId',
	                                 'rpNetwork', '$location',
	                                 function ($scope, el, $compile, $id,
	                                           network, $location)
	{
	  var queue = [];
	  var tickInterval = 4000;
	  var tickUpcoming = false;

	  var tplAccount = __webpack_require__(59);

	  // Activate #status panel
	  $scope.toggle_secondary = function () {
	    $scope.show_secondary = !$scope.show_secondary;
	  };

	  // Username
	  $scope.$watch('userCredentials', function(){
	    var username = $scope.userCredentials.username;
	    $scope.shortUsername = null;
	    if(username && username.length > 25) {
	      $scope.shortUsername = username.substring(0,24)+"...";
	    }
	  }, true);

	  $scope.$on('$netConnected', function (e) {
	    setConnectionStatus(true);
	  });

	  $scope.$on('$netDisconnected', function (e) {
	    setConnectionStatus(false);
	  });

	  var updateNotifications = function () {
	    if ($scope.events) {
	      $scope.notifications = $scope.events.slice(0,10);
	    }
	  };

	  $scope.$on('$eventsUpdate', updateNotifications);

	  /**
	   * Marks all the notifications as seen.
	   */
	  $scope.read = function() {
	    // don't do anything if account is unfunded
	    if (!$scope.notifications.length)
	      return;

	    var lastTxDate = $scope.notifications[0].date;

	    if ($scope.unseen > 0) {
	      $scope.unseen = 0;
	    }

	    if (($scope.userBlob.data.lastSeenTxDate || 0) < lastTxDate) {
	      // Remember last seen date
	      $scope.userBlob.set("/lastSeenTxDate", lastTxDate);

	      // Reset the counter
	      $scope.unseen = $scope.unseenNotifications.count;
	      $scope.unseenNotifications.count = 0;

	      // Set seen for all the events
	//      _.each($scope.events, function(event){
	//        event.unseen = false;
	//      })
	    }
	  };

	  /**
	   * Graphically display a network-related notifications.
	   *
	   * This function does no filtering - we assume that any transaction that makes
	   * it here is ready to be rendered by the notification area.
	   *
	   * @param {Object} e Angular event object
	   * @param {Object} tx Transaction info, returned from JsonRewriter#processTxn
	   */

	// VH: Hiding this for now.
	//  $scope.$on('$appTxNotification', function (e, tx) {
	//    var $localScope = $scope.$new();
	//    $localScope.tx = tx.tx;
	//
	//    var html = tplAccount($localScope);
	//
	//    if (html.length) {
	//      var msg = $compile(html)($localScope);
	//      enqueue(msg);
	//    }
	//  });

	  function setConnectionStatus(connected) {
	    $scope.connected = !!connected;
	    if (connected) {
	      notifyEl.find('.type-offline').remove();
	    } else {
	      notifyEl.append('<div class="notification active type-offline">OFFLINE</div>');
	    }
	  }

	  // A notification might have been queued already before the app was fully
	  // initialized. If so, we display it now.
	  if (queue.length) tick();

	  var notifyEl = $('<div>').attr('id', 'notification').insertAfter(el);

	  // Default to disconnected
	  setTimeout(function() {
	    setConnectionStatus($scope.connected);
	  }, 1000 * 3);

	  /**
	   * Add the status message to the queue.
	   */
	  function enqueue(msg)
	  {
	    queue.push(msg);
	    if (!tickUpcoming) {
	      setImmediate(tick);
	    }
	  }

	  /**
	   * Proceed to next notification.
	   */
	  var prevEl = null;
	  function tick()
	  {
	    if (prevEl) {
	      // Hide notification box
	      prevEl.removeClass('active');
	      var prevElRef = prevEl;
	      setTimeout(function () {
	        prevElRef.remove();
	      }, 1000);
	      prevEl = null;
	    }

	    tickUpcoming = false;
	    if (queue.length) {
	      // Ensure secondary currencies pulldown is closed
	      $scope.$apply(function() {
	        $scope.show_secondary = false;
	      });

	      // Show next status message
	      var next = queue.shift();

	      var el = $(next);
	      el.addClass('notification');
	      el.appendTo(notifyEl);
	      setImmediate(function () {
	        el.addClass('active');
	      });

	      prevEl = el;

	      tickUpcoming = true;
	      setTimeout(tick, tickInterval);
	    }
	  }

	  updateNotifications();

	  // Testing Hooks
	  this.setConnectionStatus = setConnectionStatus;
	  this.enqueue             = enqueue;
	  this.tick                = tick;
	}]);


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * CHARTS
	 *
	 * Charts and data visualization directives go into this file.
	 */

	var module = angular.module('charts', []);

	/**
	 * Trust line graph. (Similar to small box plot.)
	 */
	module.directive('rpTrustLine', ['$filter', function($filter) {
	  function redraw(ctx, data) {
	    // Axis distance to left and right edges
	    var axisMargin = 30;
	    // Tick length away from axis
	    var tickLen    = 5;
	    // Thickness of bars
	    var barWidth   = 6;
	    // Offset for text below axis
	    var lowText    = 16;
	    // Offset for text above bar
	    var highText   = -10;

	    // Fetch size of canvas
	    var width      = ctx.canvas.width;
	    var height     = ctx.canvas.height;
	    var axisLen    = width - axisMargin * 2;
	    var axisY      = Math.floor(height/2);

	    // Clear canvas
	    ctx.clearRect(0, 0, width, height);

	    // Parse input data
	    var trust_l, trust_r, balance;
	    try {
	      trust_l = -data.limit_peer.to_number();
	      trust_r = data.limit.to_number();
	      balance = data.balance.to_number();
	    } catch (e) {
	      // In case of invalid input data we simply skip drawing the chart.
	      return;
	    }

	    // Calculate minimum and maximum logical point
	    var min        = Math.min(balance, trust_l);
	    var max        = Math.max(balance, trust_r);
	    var scale      = axisLen / (max - min);

	    ctx.lineWidth = 2;
	    ctx.strokeStyle = '#333';

	    // Draw balance
	    if (balance > 0) {
	      ctx.beginPath();
	      ctx.rect(f(0), axisY-barWidth, f(balance)-f(0), barWidth);
	      ctx.fillStyle = 'green';
	      ctx.fill();
	    } else {
	      ctx.beginPath();
	      ctx.rect(f(balance), axisY, f(0)-f(balance), barWidth);
	      ctx.fillStyle = balance === 0 ? 'black' : 'red';
	      ctx.fill();
	    }

	    ctx.beginPath();
	    // Draw axis
	    ctx.moveTo(f(trust_l), axisY);
	    ctx.lineTo(f(trust_r), axisY);
	    // Left end tick
	    ctx.moveTo(f(trust_l), axisY-tickLen);
	    ctx.lineTo(f(trust_l), axisY+tickLen);
	    // Right end tick
	    ctx.moveTo(f(trust_r), axisY-tickLen);
	    ctx.lineTo(f(trust_r), axisY+tickLen);
	    // Origin tick
	    ctx.moveTo(f(0),       axisY-tickLen);
	    ctx.lineTo(f(0),       axisY+tickLen);
	    ctx.stroke();

	    // Draw labels
	    var rpamount = $filter('rpamount');
	    var fmt = {rel_precision: 0};
	    ctx.font = "11px sans-serif";
	    ctx.textAlign = 'center';
	    ctx.fillText(rpamount(data.balance, fmt), f(balance), axisY+highText);
	    ctx.fillStyle = '#333';

	    var lAmount = rpamount(data.limit_peer, fmt);

	    if (0 !== trust_l)
	      lAmount = "-"+lAmount;

	    if (trust_l === trust_r && 0 === trust_l) {
	      lAmount = "0 / 0";
	    } else {
	      ctx.fillText(rpamount(data.limit, fmt), f(trust_r), axisY+lowText);
	    }

	    ctx.fillText(lAmount, f(trust_l), axisY+lowText);

	    // Exchange a value to a pixel position
	    function f(val)
	    {
	      // Enforce limits
	      val = Math.min(val, max);
	      val = Math.max(val, min);
	      return Math.round((val - min) * scale + axisMargin);
	    }
	  }

	  return {
	    restrict: 'E',
	    template: '<canvas width="140" height="50">',
	    scope: {
	      data: '=rpLineData'
	    },
	    link: function(scope, elm, attrs) {
	      var ctx = elm.find('canvas')[0].getContext('2d');

	      redraw(ctx, scope.data);

	      scope.$watch('data', function () {
	        redraw(ctx, scope.data);
	      }, true);
	    }
	  };
	}]);



	/**
	 * Balance pie chart
	 */
	module.directive('rpPieChart', ['$filter', function($filter) {
	  var rpcurrency = $filter('rpcurrency');
	  var rpcontactname = $filter('rpcontactname');
	  function contactButNotXrp(x) {
	    return x==="XRP" ? "XRP" : rpcontactname(x);
	  }

	  // Create a pie chart in the element, using the data on the scope.
	  function pieChart(element, scope) {
	    
	    var SIZE = parseInt(scope.size, 10);
	    
	    // Main function
	    function drawPieChart(container, exchangeRates, drops, ious) {
	      
	      if (!(drops && exchangeRates && Object.keys(exchangeRates).length)) {
	        return;
	      }
	      
	      var xrpAsSuch = parseInt(drops,10) / 1000000;      
	      
	      // We construct an array of "pieces", which each correspond to one piece of the pie,
	      // containing information that will be extracted to calculate the appearance of each sector.
	      var pieces = [{
	        issuerSubshares: [{
	          issuer: "XRP",
	          subbalance: xrpAsSuch
	        }],
	        amountForCurrency: "0"
	      }];
	        
	      function descendingBy(key) {
	        return function(a,b) {
	          return b[key] - a[key];
	        };
	      }
	        
	      var totalAsXrp = xrpAsSuch;
	      for (var cur in ious) {if (ious.hasOwnProperty(cur)){
	        var components = ious[cur].components;
	        var issuerSubshares = [];
	        var issuer;
	        for (issuer in components) {if (components.hasOwnProperty(issuer)){
	          var amount = components[issuer].to_number();
	          // The chart ignores negative balances. The user should be notified (separately) of this omission.
	          if (amount > 0) {
	            var subbalanceAsXrp = amount * (exchangeRates[cur+":"+issuer] || 0);
	            totalAsXrp += subbalanceAsXrp;
	            issuerSubshares.push({
	              issuer: contactButNotXrp(issuer),
	              subbalance: subbalanceAsXrp
	            });
	          }
	        }}
	        issuerSubshares.sort(descendingBy("subbalance"));
	        pieces.push({
	          issuerSubshares: issuerSubshares,
	          amountForCurrency: components[issuer]
	        });
	      }}
	      
	      // Now, go through the list of pieces and do the following for each:
	      // -Divide all the subbalances by totalAsXrp, inserting the result as "subshare"s
	      // -Insert the sum of the "subshare"s as "share"
	      // -Insert "currency" by translating "amountForCurrency" into a currency
	      var i, j, piece;
	      for (i=0; i<pieces.length; i++) {
	        piece = pieces[i];
	        var share = 0;
	        for (j=0; j<piece.issuerSubshares.length; j++) {
	          var is = piece.issuerSubshares[j];
	          is.subshare = is.subbalance / totalAsXrp;
	          share += is.subshare;
	        }
	        piece.share = share;
	        piece.currency = rpcurrency(piece.amountForCurrency);
	      }
	      
	      pieces.sort(descendingBy("share"));
	      
	      
	      // Reset the container
	      container.find('*').remove()
	      container.append('<svg></svg>');
	      
	      // Draw the subsectors          
	      function selectValue(name) {
	        return function(o) {
	          return o[name];
	        }
	      }
	      var p, offset=0, broken=false;
	      for (p=0; p<pieces.length; p++) {
	        piece = pieces[p];
	        if (p>0) {
	          offset += pieces[p-1].share;
	        }
	        if (offset < 0.97) {
	          drawSectors(
	            container,
	            piece.issuerSubshares.map(selectValue("subshare")),
	            piece.issuerSubshares.map(selectValue("issuer")),
	            "sub",
	            piece.currency,
	            offset
	          );
	        } else if (offset < 0.999999999999) { // (to account for floating-point errors)
	          // We've come to the limit, and so we'll lump the rest in under "other".
	          broken = true;
	          drawSectors(container, [1 - offset], ["other"], "sub", "other", offset);
	          break;
	        }
	      }
	      if (broken) {
	        pieces.length = p;
	        pieces.push({
	          share: 1 - offset,
	          currency: "other" // We are trusting here that no actual currency will ever be called "other".
	        });
	      }

	      // Draw the main sectors.
	      // This must come last, so that the onMouseOver works.
	      drawSectors(
	        container,
	        pieces.map(selectValue("share")),
	        pieces.map(selectValue("currency")),
	        "main",
	        pieces.map(selectValue("currency"))
	      );
	      
	      // Draw the hole in the middle
	      $('<circle></circle>').appendTo(container.find('svg')).attr({
	        "class": "hole",
	        cx:   SIZE/2,
	        cy:   SIZE/2,
	        r:    SIZE/6
	      });
	      
	      // Refresh the DOM (because JQuery and SVG don't play nice)
	      container.html(container.html());
	      
	      // Center text elements
	      container.find("text").each(function(){
	        var width = $(this)[0].getBBox().width;
	        var x = $(this).attr("x");
	        $(this).attr("x",x - width/2);
	      });
	      
	      // Resolve collisions and adjust viewBox
	      var extremeBounds = resolveCollisions(container);
	      var PADDING = 5
	      container.find('svg')[0].setAttribute("viewBox", [
	        (extremeBounds.left-PADDING),
	        (extremeBounds.top-PADDING),
	        (extremeBounds.right-extremeBounds.left+PADDING*2),
	        (extremeBounds.bottom-extremeBounds.top+PADDING*2)
	      ].join(" "));
	      
	      // Define hovering behavior
	      container.find("path.main").on("mouseover", function(){
	        var group = $(this).attr("group");
	        container.find(".main text").css("opacity",0);
	        container.find(".main path").css("opacity",0.125);
	        $(this).css("opacity",0);
	        container.find(".sub[group='"+group+"']").css("opacity",1);
	      }).on("mouseout", function(){
	        container.find(".main").css("opacity",1);
	        container.find(".sub").css("opacity",0);
	      });
	      
	    }
	    
	    // Given a container, and parallel arrays "shares" and "labels",
	    // draw sectors on the container's SVG element, with the given "cssClass" and "grouping".
	    // Off-set the whole thing by "offset" turns.
	    function drawSectors(container, shares, labels, cssClass, grouping, offset) {
	      var TAU = Math.PI*2;
	      if (shares.length && shares[0] === 1) {
	        shares[0] = 0.9999;
	      }
	      if (offset) {
	        shares.unshift(offset);
	        labels.unshift("!!!"); // If you see this in the view, something's wrong.
	      }
	      
	      
	      var boundaries = [];
	      var sum = 0;
	      var i;
	      for (i=0; i<shares.length; i++) {
	        boundaries.push(shares[i]+sum);
	        sum += shares[i];
	      }
	      var boundaryAngles = boundaries.map(function(x){return x*TAU;});
	      
	      var midpoints = [];
	      for (i=0; i<shares.length; i++) {
	        midpoints.push((boundaries[i-1]||0) + shares[i]/2);
	      }
	      var midpointAngles = midpoints.map(function(x){return x*TAU;});
	      
	      var center = [SIZE/2,SIZE/2];
	      var circleRadius = SIZE/2;
	      
	      var polarToRect = function(radius, angle) {
	        return [
	          center[0]+radius*Math.sin(angle), 
	          center[1]-radius*Math.cos(angle)
	        ];
	      };
	      
	      
	      var sectors = [];
	      for ((offset ? i=1 : i=0); i<shares.length; i++) {
	        var share = shares[i];
	        if (share !== 0) {
	          var pointA = polarToRect(circleRadius, boundaryAngles[i-1]||0);
	          var pointB = polarToRect(circleRadius, boundaryAngles[i]);
	          var labelCoords = polarToRect(circleRadius+20, midpointAngles[i]);
	          var labelPosition = {
	            x: labelCoords[0],
	            y: labelCoords[1]
	          };
	          
	          sectors.push({
	            path: "M "+center.join(",")+
	              " L "+pointA.join(",")+
	              " A "+circleRadius+","+circleRadius+
	              " 0,"+(shares[i]>0.5?"1":"0")+",1 "+
	              pointB.join(",")+" Z",
	            labelPosition: labelPosition,
	            labelText: labels[i],
	            group: "string"===typeof(grouping) ? grouping : grouping[i],
	            share: share
	          });
	        }
	      }

	      var svg = container.find('svg').attr({
	        width: "100%",
	        height: SIZE*19/12,
	        "xmlns:svg": "http://www.w3.org/2000/svg",
	        "xmlns":     "http://www.w3.org/2000/svg"
	      });
	      
	      var sector, g;
	      for (i=0; i<sectors.length; i++) {
	        sector = sectors[i];
	        
	        var colorClass = sector.group.toLowerCase();
	        if (!({
	          xrp: true,
	          usd: true,
	          btc: true,
	          eur: true,
	          cny: true,
	          jpy: true,
	          cad: true, // If we add any more specific currency colors, add them to this list also.
	          other: true
	        }).hasOwnProperty(colorClass)) {
	          colorClass = "generic" + (i%2 + 1);
	        }
	        g = $('<g></g>').appendTo(svg).attr({
	          "class": cssClass + " " + colorClass,
	          group: sector.group
	        });
	        
	        $('<path></path>').appendTo(g).attr({
	          d: sector.path,
	          "class": cssClass,
	          group: sector.group
	        });
	      }

	      for (i=0; i<sectors.length; i++) {
	        sector = sectors[i];
	        
	        g = $('<g></g>').appendTo(svg).attr({
	          "class": cssClass + " pielabel",
	          group: sector.group
	        });
	        
	        $('<text></text>').appendTo(g).text(sector.labelText).attr({
	          x: sector.labelPosition.x,
	          y: sector.labelPosition.y,
	          "class": cssClass,
	          group: sector.group
	        });
	        
	        var percentage = Math.round(sector.share*100);
	        if (percentage === 0 && sector.share > 0) {
	          percentage = "<1";
	        }
	        
	        $('<text></text>').appendTo(g).text(percentage+"%").attr({
	          "class": cssClass + " percentage",
	          x: sector.labelPosition.x,
	          y: sector.labelPosition.y+14,
	          group: sector.group
	        });
	      }
	    }

	    // Move the labels around until they don't overlap, and return the extreme bounding box.
	    // (The adjustment is only done a finite number of times, to avoid an infinite loop.)
	    function resolveCollisions(container) {
	      var svg = container.find('svg');
	      var bounds = [];

	      var iterations=0, mainBounds, changed, temp;
	      do {
	        temp = resolveCollisionsInSelection(svg.find("g.main.pielabel"));
	        mainBounds = temp[0];
	        changed = temp[1];
	        iterations++;
	      } while (changed && iterations<10);
	      bounds.push(mainBounds);
	      
	      var groups = {};
	      svg.find("g.sub.pielabel").each(function(){
	        groups[$(this).attr("group")] = true;
	      });
	      var okg = Object.keys(groups);
	      var i;
	      var groupBounds;
	      for (i=0; i<okg.length; i++) {
	        var group = okg[i];
	        var selection = svg.find("g.sub.pielabel[group='"+group+"']");
	        iterations = 0;
	        do {
	          temp = resolveCollisionsInSelection(selection);
	          groupBounds = temp[0];
	          changed = temp[1];
	          iterations++;
	        } while (changed && iterations<10);
	        bounds.push(groupBounds);
	      }
	      return findExtremeBounds(bounds);
	    }
	    
	    // Given a list of "bounds" objects, find the smallest bound that contains them all.
	    function findExtremeBounds(bounds) {
	      var extrema = {
	        left:    0,
	        right:  SIZE,
	        top:     0,
	        bottom: SIZE
	      };
	      
	      for (var i=0; i<bounds.length; i++) {
	        var bound = bounds[i];
	        extrema = {
	          left:   Math.min(extrema.left, bound.left),
	          right:  Math.max(extrema.right, bound.right),
	          top:    Math.min(extrema.top, bound.top),
	          bottom: Math.max(extrema.bottom, bound.bottom)
	        };
	      }
	      return extrema;
	    }
	    
	    // Given a selection, move the labels around if they collide.
	    // Returns an array: [
	    //   The extreme bounds after moving the labels, and
	    //   true/false whether anything was moved.
	    // ]
	    function resolveCollisionsInSelection(selection) {
	      var bounds = [];
	      selection.each(function(){
	        var bbox = $(this)[0].getBBox();
	        bounds.push({
	          left:   bbox.x,
	          right:  bbox.x+bbox.width,
	          top:    bbox.y,
	          bottom: bbox.y+bbox.height
	        });
	      });
	      var collisions = {};
	      var collider, collidee;
	      for (collider=0; collider<bounds.length; collider++) {
	        var colliderBounds = bounds[collider];
	        for (collidee=0; collidee<bounds.length; collidee++) { if (collider !== collidee) {
	          var collideeBounds = bounds[collidee];
	          var collisionLR = colliderBounds.right - collideeBounds.left;
	          var collisionRL = colliderBounds.left - collideeBounds.right;
	          var collisionTB = colliderBounds.bottom - collideeBounds.top;
	          var collisionBT = colliderBounds.top - collideeBounds.bottom;
	          
	          if (collisionLR > 0 && collisionRL < 0 && collisionTB > 0 && collisionBT < 0) {
	            if (!collisions[collider]) {
	              collisions[collider] = {};
	            }
	            if (!collisions[collider][collidee]) {
	              collisions[collider][collidee] = {};
	            }
	            collisions[collider][collidee] = {
	              x: (collisionLR > -collisionRL ? collisionRL : collisionLR),
	              y: (collisionTB > -collisionBT ? collisionBT : collisionTB)
	            };
	          }
	        }}
	      }
	      
	      function adjustBy(collision, coordinate) {
	        return function() {
	          var t = $(this).attr(coordinate);
	          var adjustment = collision[coordinate];
	          $(this).attr(coordinate,t-adjustment/1.9);
	        }
	      }
	      
	      for (collider in collisions) {if (collisions.hasOwnProperty(collider)) {
	        var collidingWith = collisions[collider];
	        for (collidee in collidingWith) {if (collidingWith.hasOwnProperty(collidee)) {
	          var collision = collidingWith[collidee];
	          var g = $(selection[collider]);
	          if (Math.abs(collision.x) < Math.abs(collision.y)) {
	            g.find("text").each(adjustBy(collision,"x"));
	          } else {
	            g.find("text").each(adjustBy(collision,"y"));
	          }
	        }}
	      }}
	            
	      return [
	        findExtremeBounds(bounds),
	        !!(Object.keys(collisions).length)
	      ];
	    }
	    
	    
	    // Finally, call the main function.
	    drawPieChart(element, scope.exchangeRates, scope.drops, scope.ious);
	  }
	  
	  return {
	    restrict: 'E',
	    scope: {
	      drops: '=rpDrops',
	      ious: '=rpIous',
	      exchangeRates: '=rpExchangeRates',
	      size: '@rpSize'
	    },
	    link: function(scope, element, attributes) {
	      pieChart(element, scope),
	      scope.$watch('drops', function() {
	        pieChart(element, scope);
	      });
	      
	      scope.$on('$balancesUpdate', function() {
	        pieChart(element, scope);
	      });
	      
	      scope.$watch('exchangeRates', function() {
	        pieChart(element, scope);
	      }, true);
	    }
	  };
	}]); 





/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * FIELDS
	 *
	 * Angular-powered input components go into this file.
	 */

	var webutil = __webpack_require__(52);

	var module = angular.module('fields', []);

	/**
	 * Combobox input element.
	 *
	 * Adds a autocomplete-like dropdown to an input element.
	 *
	 * @param {string} rpCombobox Pass a function that takes a string and returns
	 *   the matching autocompletions.
	 */
	module.directive('rpCombobox', [function () {
	  return {
	    restrict: 'A',
	    require: '?ngModel',
	    link: function (scope, el, attrs, ngModel) {
	      var keyCursor = -1;

	      el.wrap('<div class="rp-combobox">');
	      el.attr('autocomplete', 'off');
	      var cplEl = $('<ul class="completions"></ul>').hide();
	      el.parent().append(cplEl);

	      // Explicit select button
	      if (attrs.rpComboboxSelect) {
	        var selectEl = $('<div>').appendTo(el.parent());
	        selectEl.addClass('select');
	        selectEl.mousedown(function (e) {
	          e.preventDefault();
	        });
	        selectEl.click(function () {
	          var complFn = scope.$eval(attrs.rpCombobox);
	          if ("function" !== typeof complFn) {
	            var options = complFn;
	            complFn = webutil.queryFromOptions(complFn);
	            scope.$watch(options, function(value) {
	              setCompletions(complFn());
	            });
	          }
	          setCompletions(complFn());
	          if (cplEl.is(':visible')) {
	            el.blur();
	          } else {
	            setCompletions(complFn());
	            el.focus();
	          }
	        });
	      }

	      // Listen for keyboard keydown events
	      el.keydown(function (e) {
	        // "Up/Down" key press
	        if (e.which === 38 || e.which === 40) {
	          if (!cplEl.children().length) {
	            updateCompletions();
	          }
	          e.preventDefault();

	          // Move cursor (highlighted option) up/down
	          if (e.which === 38) keyCursor--;
	          else keyCursor++;

	          updateKeyCursor();
	        }

	        // "Enter" key press (select the option)
	        else if (e.which === 13) {
	          var curEl = cplEl.find('li.cursor');
	          if (cplEl.is(':visible')) {
	            e.preventDefault();
	          }
	          if (cplEl.find('li').length === 1) {
	            // Only one completion, we'll assume that's the one they want
	            selectCompletion(cplEl.find('li'));
	          } else if (curEl.length === 1) {
	            selectCompletion(curEl);
	          }
	        }

	        // "ESC" key press
	        else if (e.which === 27) {
	          // Hide the options list
	          setVisible(false);
	        }
	      });

	      // Listen for keyboard keyup events to enable binding
	      el.keyup(function(e) {
	        // Ignore Left, up, right, down
	        if (e.which >= 37 && e.which <= 40) return;
	        // Ignore Enter, Esc
	        if (e.which === 13 || e.which === 27) return;

	        // Any other keypress should update completions list
	        updateCompletions();
	      });

	      el.focus(function() {
	        keyCursor = -1;
	        triggerCompletions();
	      });

	      el.blur(function() {
	        setVisible(false);
	      });

	      cplEl.mousedown(function (e) {
	        e.preventDefault();
	      });

	      function setVisible(to) {
	        el.parent()[to ? 'addClass' : 'removeClass']('active');
	        cplEl[to ? 'fadeIn' : 'fadeOut']('fast');
	      }

	      /**
	       * Update completions list
	       */
	      function updateCompletions() {
	        var match = ngModel.$viewValue, // Input value
	            completions = [], re = null,
	            complFn, valueOption;

	        // Query function. This should return the full options list
	        complFn = scope.$eval(attrs.rpCombobox);

	        // Uses the default query function, if it's not defined
	        if ("function" !== typeof complFn) {
	          complFn = webutil.queryFromOptions(complFn);
	        }

	        if ("string" === typeof match && match.length) {
	          // Escape field value
	          var escaped = webutil.escapeRegExp(match);
	          // Build the regex for completion list lookup
	          re = new RegExp('('+escaped+')', 'i');

	          completions = complFn(match, re);
	        }

	        // Value as option
	        if (attrs.rpComboboxValueAsOption && match.length) {
	          var prefix = attrs.rpComboboxValueAsOptionPrefix;

	          valueOption = (prefix && 0 !== match.indexOf(prefix))
	            ? prefix + match
	            : match;

	          completions.push(valueOption);
	        }

	        // Value as ripple name
	        if (attrs.rpComboboxValueAsRippleName && match.length
	          && 'web' === scope.client) { // TODO Don't do a client check in validators
	          valueOption = (0 !== match.indexOf('~'))
	            ? '~' + match
	            : match;

	          if (webutil.isRippleName(valueOption)) {
	            completions.push(valueOption);
	          }
	        }

	        // By fading out without updating the completions we get a smoother effect
	        if (!completions.length) {
	          setVisible(false);
	          return;
	        }

	        setCompletions(completions, re);
	        triggerCompletions();
	      }

	      function setCompletions(completions, re) {
	        cplEl.empty();
	        keyCursor = -1;
	        completions.forEach(function (completion) {
	          var additional = '';

	          if ("string" === typeof completion) {
	            val = completion;
	          } else {
	            val = completion.name;

	            if (completion.additional) {
	              additional = '<span class="additional">' + completion.additional + '</span>';
	            }
	          }

	          if (re) val = val.replace(re, '<u>$1</u>');
	          var completionHtml = $('<li><span class="val">' + val + '</span>' + additional + '</li>');
	          el.parent().find('.completions').append(completionHtml);
	        });
	      }

	      function triggerCompletions() {
	        var cplEls = cplEl.children();
	        var visible = !!cplEls.length;
	        if (cplEls.length === 1 &&
	            cplEls.eq(0).text() === el.val()) {
	          visible = false;
	        }
	        setVisible(visible);
	      }

	      // Update the cursor (highlight selected option)
	      function updateKeyCursor() {
	        var opts = cplEl.find('li');
	        keyCursor = Math.max(keyCursor, 0);
	        keyCursor = Math.min(keyCursor, opts.length - 1);
	        opts.removeClass('cursor');
	        opts.eq(keyCursor).addClass('cursor');
	      }

	      function selectCompletion(liEl) {
	        var val = $(liEl).find('.val').text();
	        scope.$apply(function () {
	          el.val(val);
	          ngModel.$setViewValue(val);
	          setVisible(false);
	        });
	      }

	      function escape(str) {
	        return str
	          .replace(/&/g, '&amp;')
	          .replace(/</g, '&lt;')
	          .replace(/>/g, '&gt;')
	          .replace(/"/g, '&quot;')
	          .replace(/'/g, '&apos;');
	      }

	      cplEl.on('click', 'li', function () {
	        selectCompletion(this);
	      });
	    }
	  };
	}]);

	/**
	 * Datepicker
	 */
	module.directive('rpDatepicker', [function() {
	  return {
	    restrict: 'A',
	    require: '?ngModel',
	    link: function(scope, element, attr, ngModel) {
	      attr.$observe('rpDatepicker', function() {
	        var dp = $(element).datepicker();
	        dp.on('changeDate', function(e) {
	          scope.$apply(function () {
	            ngModel.$setViewValue(e.date.getMonth() ? e.date : new Date(e.date));
	          });
	        });
	        scope.$watch(attr.ngModel,function() {
	          var update = ngModel.$viewValue;

	          function falsy(v) {return v == '0' || v == 'false'; }

	          if (!falsy(attr.ignoreInvalidUpdate) &&
	               (update == null ||
	                 (update instanceof Date && isNaN(update.getYear())) )) {
	              return;
	            } else {
	              dp.datepicker('setValue', update)
	                .datepicker('update');
	            }
	        });
	      });
	    }
	  };
	}]);

	module.directive('fileUploadButton', function() {
	  return {
	    require: '^ngModel',
	    link: function(scope, element, attributes) {
	      var el = angular.element(element);

	      var button = el.children()[0];

	      el.css({
	        'position': 'relative',
	        'margin-bottom': 14
	      });

	      var fileInput = angular.element('<input type="file" ng-model="walletfile" nwsaveas="wallet.txt" />');

	      fileInput.bind('change', function () {
	          scope.$apply(attributes.fileUploadButton);
	      });

	      fileInput.css({
	        position: 'absolute',
	        top: 0,
	        left: 0,
	        'z-index': '2',
	        width: '100%',
	        height: '100%',
	        opacity: '0',
	        cursor: 'pointer'
	      });

	      el.append(fileInput);
	    }
	  }
	});



/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * EFFECTS
	 *
	 * Angular-powered animation and visual effects directives go into this file.
	 */

	var module = angular.module('effects', []);

	/**
	 * Animate element creation
	 */
	module.directive('rpAnimate', function() {
	  return {
	    restrict: 'A',
	    link: function(scope, elm, attrs) {
	      if (attrs.rpAnimate !== "rp-animate" && !scope.$eval(attrs.rpAnimate)) return;
	      elm = jQuery(elm);
	      elm.hide();
	      elm.fadeIn(600);
	      elm.css('background-color', '#E2F5E4');
	      elm.addClass('rp-animate-during rp-animate');
	      elm.animate({
	        'background-color': '#fff'
	      }, {
	        duration: 600,
	        complete: function () {
	          elm.removeClass('rp-animate-during').addClass('rp-animate-after');
	        }
	      });
	    }
	  };
	});


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * VALIDATORS
	 *
	 * Form validation directives go into this file.
	 */

	var webutil = __webpack_require__(52),
	    Base = ripple.Base,
	    Amount = ripple.Amount,
	    Currency = ripple.Currency;

	var module = angular.module('validators', []);

	/**
	 * Secret Account Key validator
	 */
	module.directive('rpMasterKey', function () {
	  return {
	    restrict: 'A',
	    require: '?ngModel',
	    link: function (scope, elm, attr, ctrl) {
	      if (!ctrl) return;

	      var validator = function(value) {
	        if (value && !Base.decode_check(33, value)) {
	          ctrl.$setValidity('rpMasterKey', false);
	          return;
	        }

	        ctrl.$setValidity('rpMasterKey', true);
	        return value;
	      };

	      ctrl.$formatters.push(validator);
	      ctrl.$parsers.unshift(validator);

	      attr.$observe('rpMasterKey', function() {
	        validator(ctrl.$viewValue);
	      });
	    }
	  };
	});

	/*
	 * Invalidate duplicate account_id's
	 * consider the masterkey invalid unless the database does not have the derived account_id
	 */
	module.directive('rpMasterAddressExists', function ($http) {
	  return {
	    restrict: 'A',
	    require: '?ngModel',
	    link: function (scope, elm, attr, ctrl) {
	      if (!ctrl) return;

	      var validator = function(value) {
	        if (!value || !Base.decode_check(33, value)) {
	          ctrl.$setValidity('rpMasterAddressExists', true);
	          return value;
	        
	        } else if (value) {
	          ctrl.$setValidity('rpMasterAddressExists', false); //while checking
	          scope.checkingMasterkey = true;
	          var account_id = ripple.Seed.from_json(value).get_key().get_address().to_json();    
	              
	          //NOTE: is there a better way to get the blobvault URL?         
	          ripple.AuthInfo.get(Options.domain, "1", function(err, authInfo) {
	            if (err) {
	              scope.checkingMasterkey = false;
	              return;
	            }
	            
	            $http.get(authInfo.blobvault + '/v1/user/' + account_id)
	              .success(function(data) {
	                if (data.username) {
	                  scope.masterkeyUsername = data.username; 
	                  scope.masterkeyAddress  = account_id;
	                  ctrl.$setValidity('rpMasterAddressExists', false);
	                  scope.checkingMasterkey = false;
	                } else {
	                  ctrl.$setValidity('rpMasterAddressExists', true);
	                  scope.checkingMasterkey = false;
	                }
	              });
	          });

	          return value;
	        }
	      };

	      ctrl.$formatters.push(validator);
	      ctrl.$parsers.unshift(validator);

	      attr.$observe('rpMasterAddressExists', function() {
	        validator(ctrl.$viewValue);
	      });
	    }
	  };
	});

	/**
	 * Validate a payment destination.
	 *
	 * You can set this validator and one or more of the type attributes:
	 *
	 * - rp-dest-address     - If set, allows Ripple addresses as destinations.
	 * - rp-dest-contact     - If set, allows address book contacts.
	 * - rp-dest-bitcoin     - If set, allows Bitcoin addresses as destinations.
	 * - rp-dest-email       - If set, allows federation/email addresses.
	 * - rp-dest-ripple-name - If set, allows Existing ripple name as destination.
	 * - rp-dest-model       - If set, updates the model with the resolved ripple address.
	 *
	 * If the input can be validly interpreted as one of these types, the validation
	 * will succeed.
	 */
	module.directive('rpDest', function ($timeout, $parse) {
	  var emailRegex = /^\S+@\S+\.[^\s.]+$/;
	  return {
	    restrict: 'A',
	    require: '?ngModel',
	    link: function (scope, elm, attr, ctrl) {
	      if (!ctrl) return;

	      var timeoutPromise, getter;
	      var validator = function(value) {
	        var strippedValue = webutil.stripRippleAddress(value);
	        var address = ripple.UInt160.from_json(strippedValue);

	        ctrl.rpDestType = null;

	        if (attr.rpDestAddress && address.is_valid()) {
	          ctrl.rpDestType = "address";
	          ctrl.$setValidity('rpDest', true);

	          if (attr.rpDestModel) {
	            getter = $parse(attr.rpDestModel);
	            getter.assign(scope,value);
	          }

	          return value;
	        }

	        if (attr.rpDestContact && scope.userBlob &&
	            webutil.getContact(scope.userBlob.data.contacts,strippedValue)) {
	          ctrl.rpDestType = "contact";
	          ctrl.$setValidity('rpDest', true);

	          if (attr.rpDestModel) {
	            getter = $parse(attr.rpDestModel);
	            getter.assign(scope,webutil.getContact(scope.userBlob.data.contacts,strippedValue).address);
	          }

	          return value;
	        }

	        if (attr.rpDestBitcoin && !isNaN(Base.decode_check([0, 5], strippedValue, 'bitcoin'))) {
	          ctrl.rpDestType = "bitcoin";
	          ctrl.$setValidity('rpDest', true);

	          if (attr.rpDestModel) {
	            getter = $parse(attr.rpDestModel);
	            getter.assign(scope,value);
	          }

	          return value;
	        }

	        if (attr.rpDestEmail && emailRegex.test(strippedValue)) {
	          ctrl.rpDestType = "email";
	          ctrl.$setValidity('rpDest', true);

	          if (attr.rpDestModel) {
	            getter = $parse(attr.rpDestModel);
	            getter.assign(scope,value);
	          }

	          return value;
	        }

	        if (attr.rpDestRippleName && webutil.isRippleName(value)
	          && 'web' === scope.client) { // TODO Don't do a client check in validators
	          ctrl.rpDestType = "rippleName";

	          if (timeoutPromise) $timeout.cancel(timeoutPromise);

	          timeoutPromise = $timeout(function(){
	            if (attr.rpDestLoading) {
	              var getterL = $parse(attr.rpDestLoading);
	              getterL.assign(scope,true);
	            }

	            ripple.AuthInfo.get(Options.domain, value, function(err, info){
	              scope.$apply(function(){
	                ctrl.$setValidity('rpDest', info.exists);

	                if (attr.rpDestModel && info.exists) {
	                  getter = $parse(attr.rpDestModel);
	                  getter.assign(scope,info.address);
	                }

	                if (attr.rpDestLoading) {
	                  getterL.assign(scope,false);
	                }
	              });
	            });
	          }, 500);

	          return value;
	        }

	        ctrl.$setValidity('rpDest', false);
	        return;
	      };

	      ctrl.$formatters.push(validator);
	      ctrl.$parsers.unshift(validator);

	      attr.$observe('rpDest', function() {
	        validator(ctrl.$viewValue);
	      });
	    }
	  };
	});

	/**
	 * Check if the ripple name is valid and is available for use
	 */
	module.directive('rpAvailableName', function ($timeout, $parse) {
	  return {
	    restrict: 'A',
	    require: '?ngModel',
	    link: function (scope, elm, attr, ctrl) {
	      if (!ctrl) return;

	      var timeoutPromise;

	      var validator = function(value) {
	        var getterInvalidReason = $parse(attr.rpAvailableNameInvalidReason);
	        var getterReserved = $parse(attr.rpAvailableNameReservedFor);

	        if (!value) {
	          // No name entered, show nothing, do nothing
	        } else if (value.length < 2) {
	          getterInvalidReason.assign(scope,'tooshort');
	        } else if (value.length > 20) {
	          getterInvalidReason.assign(scope,'toolong');
	        } else if (!/^[a-zA-Z0-9\-]+$/.exec(value)) {
	          getterInvalidReason.assign(scope,'charset');
	        } else if (/^-/.exec(value)) {
	          getterInvalidReason.assign(scope,'starthyphen');
	        } else if (/-$/.exec(value)) {
	          getterInvalidReason.assign(scope,'endhyphen');
	        } else if (/--/.exec(value)) {
	          getterInvalidReason.assign(scope,'multhyphen');
	        } else {
	          if (timeoutPromise) $timeout.cancel(timeoutPromise);

	          timeoutPromise = $timeout(function(){
	            if (attr.rpLoading) {
	              var getterL = $parse(attr.rpLoading);
	              getterL.assign(scope,true);
	            }

	            ripple.AuthInfo.get(Options.domain, value, function(err, info){
	              scope.$apply(function(){
	                if (info.exists) {
	                  ctrl.$setValidity('rpAvailableName', false);
	                  getterInvalidReason.assign(scope,'exists');
	                } else if (info.reserved) {
	                  ctrl.$setValidity('rpAvailableName', false);
	                  getterInvalidReason.assign(scope,'reserved');
	                  getterReserved.assign(scope,info.reserved);
	                } else {
	                  ctrl.$setValidity('rpAvailableName', true);
	                }

	                if (attr.rpLoading) {
	                  getterL.assign(scope,false);
	                }
	              });
	            })
	          }, 500);

	          return value;
	        }

	        ctrl.$setValidity('rpAvailableName', false);
	        return;
	      };

	      ctrl.$formatters.push(validator);
	      ctrl.$parsers.unshift(validator);

	      attr.$observe('rpAvailableName', function() {
	        validator(ctrl.$viewValue);
	      });
	    }
	  }
	});

	/**
	 * Source and destination tags validator
	 *
	 * Integer in the range 0 to 2^32-1
	 */
	module.directive('rpStdt', function () {
	  return {
	    restrict: 'A',
	    require: '?ngModel',
	    link: function (scope, elm, attr, ctrl) {
	      if (!ctrl) return;

	      var validator = function(value) {
	        if (!value || (!isNaN(parseFloat(value)) && isFinite(value) && value >= 0 && value < Math.pow(2,32) - 1)) {
	          ctrl.$setValidity('rpStdt', true);
	          return value;
	        } else {
	          ctrl.$setValidity('rpStdt', false);
	          return;
	        }
	      };

	      ctrl.$formatters.push(validator);
	      ctrl.$parsers.unshift(validator);

	      attr.$observe('rpStdt', function() {
	        validator(ctrl.$viewValue);
	      });
	    }
	  };
	});

	module.directive('rpNotMe', function () {
	  return {
	    restrict: 'A',
	    require: '?ngModel',
	    link: function (scope, elm, attr, ctrl) {
	      if (!ctrl) return;

	      var validator = function(value) {
	        var contact = webutil.getContact(scope.userBlob.data.contacts,value);

	        if (value) {
	          if ((contact && contact.address === scope.userBlob.data.account_id) || scope.userBlob.data.account_id === value) {
	            ctrl.$setValidity('rpNotMe', false);
	            return;
	          }
	        }

	        ctrl.$setValidity('rpNotMe', true);
	        return value;
	      };

	      ctrl.$formatters.push(validator);
	      ctrl.$parsers.unshift(validator);

	      attr.$observe('rpNotMe', function() {
	        validator(ctrl.$viewValue);
	      });
	    }
	  };
	});

	module.directive('rpIssuer', function () {
	  return {
	    restrict: 'A',
	    require: '?ngModel',
	    link: function (scope, elm, attr, ctrl) {
	      if (!ctrl) return;

	      var validator = function(value) {
	        if(!value){
	          ctrl.$setValidity('rpIssuer', false);
	          return;
	        }

	        var shortValue = value.slice(0, 3).toUpperCase();

	        if ( (shortValue==="XRP") || webutil.findIssuer(scope.lines,shortValue))
	        {
	          ctrl.$setValidity('rpIssuer', true);
	          return value;
	        } else {
	          ctrl.$setValidity('rpIssuer', false);
	          return;
	        }
	      };

	      ctrl.$formatters.push(validator);
	      ctrl.$parsers.unshift(validator);

	      attr.$observe('rpIssuer', function() {
	        validator(ctrl.$viewValue);
	      });
	    }
	  };
	});

	/**
	 * Verify a set of inputs have the same value.
	 *
	 * For example you could use this as a password repeat validator.
	 *
	 * @example
	 *   <input name=password type=password rp-same-in-set="passwordSet">
	 *   <input name=password2 type=password rp-same-in-set="passwordSet">
	 */
	module.directive('rpSameInSet', [function() {
	  return {
	    require: 'ngModel',
	    link: function(scope, elm, attrs, ctrl) {
	      var set = scope.$eval(attrs.rpSameInSet);

	      function validator(value) {
	        var oldValue = value !== ctrl.$modelValue
	            ? ctrl.$modelValue
	            : (value !== ctrl.$viewValue ? ctrl.$viewValue : value);
	        if (value !== oldValue) {
	          set[oldValue] = (set[oldValue] || 1) - 1;
	          if (set[oldValue] === 0) {
	            delete set[oldValue];
	          }
	          if (value) {
	            set[value] = (set[value] || 0) + 1;
	          }
	        }
	        return value;
	      }

	      ctrl.$formatters.push(validator);
	      ctrl.$parsers.push(validator);

	      scope.$watch(
	          function() {
	            return _.size(set) === 1;
	          },
	          function(value){
	            ctrl.$setValidity('rpSameInSet', value);
	          }
	      );
	    }
	  }
	}]);

	/**
	 * Field uniqueness validator.
	 *
	 * @param {array=} rpUnique Array of strings which are disallowed values.
	 * @param {string=} rpUniqueField If set, rpUnique will be interpreted as an
	 *   array of objects and we compare the value with the field named
	 *   rpUniqueField inside of those objects.
	 * @param {string=} rpUniqueOrig You can set this to the original value to
	 *   ensure this value is always allowed.
	 *
	 * @example
	 *   <input ng-model="name" ng-unique="addressbook" ng-unique-field="name">
	 */
	module.directive('rpUnique', function() {
	  return {
	    restrict: 'A',
	    require: '?ngModel',
	    link: function ($scope, elm, attr, ctrl) {
	      if (!ctrl) return;

	      var validator = function(value) {
	        var pool = $scope.$eval(attr.rpUnique) || [];

	        if (attr.rpUniqueOrig && value === $scope.$eval(attr.rpUniqueOrig)) {
	          // Original value is always allowed
	          ctrl.$setValidity('rpUnique', true);
	        } else if (attr.rpUniqueField) {
	          for (var i = 0, l = pool.length; i < l; i++) {
	            if (pool[i][attr.rpUniqueField] === value) {
	              ctrl.$setValidity('rpUnique', false);
	              return;
	            }
	          }
	          ctrl.$setValidity('rpUnique', true);
	        } else {
	          ctrl.$setValidity('rpUnique', pool.indexOf(value) === -1);
	        }
	        return value;
	      };

	      ctrl.$formatters.push(validator);
	      ctrl.$parsers.unshift(validator);

	      $scope.$watch(attr.rpUnique, function () {
	        validator(ctrl.$viewValue);
	      }, true);
	    }
	  };
	});

	/**
	 * Password strength validator
	 */
	module.directive('rpStrongPassword', function () {
	  return {
	    restrict: 'A',
	    require: '?ngModel',
	    link: function (scope, elm, attr, ctrl) {
	      if (!ctrl) return;

	      var validator = function(password) {
	        var score = 0;
	        var username = ""+scope.username;

	        if (!password) {
	          scope.strength = '';
	          return password;
	        }

	        // password < 6
	        if (password.length < 6 ) {
	          ctrl.$setValidity('rpStrongPassword', false);
	          scope.strength = 'weak';
	          return;
	        }

	        // password == user name
	        if (password.toLowerCase() === username.toLowerCase()) {
	          ctrl.$setValidity('rpStrongPassword', false);
	          scope.strength = 'match';
	          return;
	        }

	        checkRepetition = function (pLen, str) {
	          var res = "";
	          for (var i = 0; i < str.length; i++ ) {
	            var repeated = true;

	            for (var j = 0; j < pLen && (j+i+pLen) < str.length; j++) {
	              repeated = repeated && (str.charAt(j+i) === str.charAt(j+i+pLen));
	            }
	            if (j<pLen) {
	              repeated = false;
	            }

	            if (repeated) {
	              i += pLen-1;
	              repeated = false;
	            } else {
	              res += str.charAt(i);
	            }
	          }
	          return res;
	        };

	        // password length
	        score += password.length * 4;
	        score += ( checkRepetition(1, password).length - password.length ) * 1;
	        score += ( checkRepetition(2, password).length - password.length ) * 1;
	        score += ( checkRepetition(3, password).length - password.length ) * 1;
	        score += ( checkRepetition(4, password).length - password.length ) * 1;

	        // password has 3 numbers
	        if (password.match(/(.*[0-9].*[0-9].*[0-9])/)) {
	          score += 5;
	        }

	        // password has 2 symbols
	        if (password.match(/(.*[!,@,#,$,%,&,*,?,_,~].*[!,@,#,$,%,&,*,?,_,~])/)) {
	          score += 5;
	        }

	        // password has Upper and Lower chars
	        if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)){
	          score += 10;
	        }

	        // password has number and chars
	        if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) {
	          score += 15;
	        }

	        //password has number and symbol
	        if (password.match(/([!,@,#,$,%,&,*,?,_,~])/) && password.match(/([0-9])/)) {
	          score += 15;
	        }

	        // password has char and symbol
	        if (password.match(/([!,@,#,$,%,&,*,?,_,~])/) && password.match(/([a-zA-Z])/)) {
	          score += 15;
	        }

	        // password is just a numbers or chars
	        if (password.match(/^\w+$/) || password.match(/^\d+$/) ) {
	          score -= 10;
	        }

	        // verifying 0 < score < 100
	        if (score < 0) { score = 0; }
	        if (score > 100) { score = 100; }

	        if (score < 34) {
	          ctrl.$setValidity('rpStrongPassword', false);
	          scope.strength = 'weak';
	          return;
	        }

	        ctrl.$setValidity('rpStrongPassword', true);

	        if (score < 68) {
	          scope.strength = 'medium';
	          return password;
	        }

	        scope.strength = 'strong';
	        return password;
	      };

	      ctrl.$formatters.push(validator);
	      ctrl.$parsers.unshift(validator);

	      attr.$observe('rpStrongPassword', function() {
	        validator(ctrl.$viewValue);
	      });
	    }
	  };
	});

	module.directive('rpAmount', function () {
	  return {
	    restrict: 'A',
	    require: '?ngModel',
	    link: function (scope, elm, attr, ctrl) {
	      if (!ctrl) return;

	      var validator = function(value) {
	        if (value && value.toString().indexOf(",") != -1) {
	          value = value.split(",").join("");
	        }

	        var test = /^(([0-9]*?\.\d+)|([1-9]\d*))$/.test(value);

	        if (test && value[0] == '.') {
	          value = '0' + value;
	        }

	        // check for valid amount
	        ctrl.$setValidity('rpAmount', test);

	        return value;
	      };

	      ctrl.$formatters.push(validator);
	      ctrl.$parsers.unshift(validator);
	    }
	  };
	});

	module.directive('rpAmountPositive', function () {
	  return {
	    restrict: 'A',
	    require: '?ngModel',
	    link: function (scope, elm, attr, ctrl) {
	      if (!ctrl) return;

	      // We don't use parseAmount here, assuming that you also use rpAmount validator
	      var validator = function(value) {
	        // check for positive amount
	        ctrl.$setValidity('rpAmountPositive', value > 0);

	        return value;
	      };

	      ctrl.$formatters.push(validator);
	      ctrl.$parsers.unshift(validator);
	    }
	  };
	});

	module.directive('rpAmountXrpLimit', function () {
	  return {
	    restrict: 'A',
	    require: '?ngModel',
	    link: function (scope, elm, attr, ctrl) {
	      if (!ctrl) return;

	      // We don't use parseAmount here, assuming that you also use rpAmount validator
	      var validator = function(value) {
	        var currency = Currency.from_json(attr.rpAmountXrpLimitCurrency);

	        // If XRP, ensure amount is less than 100 billion and is at least one drop
	        if (currency.is_valid() && currency.is_native()) {
	          ctrl.$setValidity('rpAmountXrpLimit', value <= 100000000000 && value >= 0.000001);
	        } else {
	          ctrl.$setValidity('rpAmountXrpLimit', true);
	        }

	        return value;
	      };

	      ctrl.$formatters.push(validator);
	      ctrl.$parsers.unshift(validator);

	      attr.$observe('rpAmountXrpLimitCurrency', function() {
	        validator(ctrl.$viewValue);
	      });
	    }
	  };
	});

	/**
	 * Limit currencies to be entered
	 */
	module.directive('rpRestrictCurrencies', function () {
	  return {
	    restrict: 'A',
	    require: '?ngModel',
	    link: function (scope, elm, attr, ctrl) {
	      if (!ctrl) return;

	      var validator = function(value) {
	        var match = /^([a-zA-Z0-9]{3}|[A-Fa-f0-9]{40})\b/.exec(value);

	        if (attr.rpRestrictCurrencies) {
	          if (match) {
	            ctrl.$setValidity('rpRestrictCurrencies',
	              attr.rpRestrictCurrencies.indexOf(match[1]) != -1
	                ? true
	                : value === 'XRP'
	            );
	          } else {
	            ctrl.$setValidity('rpRestrictCurrencies', false);
	          }
	        }
	        else {
	          ctrl.$setValidity('rpRestrictCurrencies', true);
	        }

	        return value;
	      };

	      ctrl.$formatters.push(validator);
	      ctrl.$parsers.unshift(validator);
	    }
	  };
	});

	/**
	 * Port number validator
	 */
	module.directive('rpPortNumber', function () {
	  return {
	    restrict: 'A',
	    require: '?ngModel',
	    link: function (scope, elm, attr, ctrl) {
	      if (!ctrl) return;

	      var validator = function(value) {
	        ctrl.$setValidity('rpPortNumber', (parseInt(value,10) == value && value >= 1 && value <= 65535));
	        return value;
	      };

	      ctrl.$formatters.push(validator);
	      ctrl.$parsers.unshift(validator);

	      attr.$observe('rpPortNumber', function() {
	        validator(ctrl.$viewValue);
	      });
	    }
	  };
	});

	/**
	 * Hostname validator
	 * IPv4, IPv6 and hostname
	 */
	module.directive('rpHostname', function () {
	  return {
	    restrict: 'A',
	    require: '?ngModel',
	    link: function (scope, elm, attr, ctrl) {
	      if (!ctrl) return;

	      function validate(str) {
	        var test = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-_]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/.test(str);
	        //var test = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/.test(str);
	        return test;
	      }

	      var validator = function(value) {
	        ctrl.$setValidity('rpHostname', validate(value));
	        return value;
	      };

	      ctrl.$formatters.push(validator);
	      ctrl.$parsers.unshift(validator);

	      attr.$observe('rpHostname', function() {
	        validator(ctrl.$viewValue);
	      });
	    }
	  };
	});

	/**
	 * Used for currency selectors
	 */
	module.directive('rpNotXrp', function () {
	  return {
	    restrict: 'A',
	    require: '?ngModel',
	    link: function (scope, elm, attr, ctrl) {
	      if (!ctrl) return;

	      var validator = function(value) {
	        ctrl.$setValidity('rpNotXrp', !value || value.toLowerCase() !== 'xrp');
	        return value;
	      };

	      ctrl.$formatters.push(validator);
	      ctrl.$parsers.unshift(validator);

	      attr.$observe('rpNotXrp', function() {
	        validator(ctrl.$viewValue);
	      });
	    }
	  };
	});

	/**
	 * Email address validation
	 */
	module.directive('rpEmail', function () {
	  return {
	    restrict: 'A',
	    require: '?ngModel',
	    link: function (scope, elm, attr, ctrl) {
	      if (!ctrl) return;

	      var emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

	      var validator = function(value) {
	        ctrl.$setValidity('rpEmail', emailRegex.test(value));
	        return value;
	      };

	      ctrl.$formatters.push(validator);
	      ctrl.$parsers.unshift(validator);

	      attr.$observe('rpEmail', function() {
	        validator(ctrl.$viewValue);
	      });
	    }
	  };
	});



/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * EVENTS
	 *
	 * Angular-powered event handling directives go into this file.
	 */

	var module = angular.module('events', []);

	/**
	 * Handle ENTER key press.
	 */
	module.directive('ngEnter', function() {
	  return function(scope, elm, attrs) {
	    elm.bind('keypress', function(e) {
	      if (e.charCode === 13) scope.$apply(attrs.ngEnter);
	    });
	  };
	});


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * FORMATTERS
	 *
	 * Formatters are directives that simply display a value. Normally we do this
	 * via filters, however if the value needs HTML (rather than just text) it's
	 * better to use a directive.
	 */

	var webutil = __webpack_require__(52),
	    Amount = ripple.Amount,
	    Currency = ripple.Currency;

	var module = angular.module('formatters', ['domainalias']);

	module.directive('rpPrettyIssuer', ['rpDomainAlias',
	                                    function (aliasService) {
	  return {
	    restrict: 'EA',
	    scope: {
	      issuer: '=rpPrettyIssuer',
	      contacts: '=rpPrettyIssuerContacts'
	    },
	    template: '{{alias || name || issuer}}',
	    compile: function (element, attr, linker) {
	      return function (scope, element, attr) {
	        function update() {
	          if (!scope.issuer) {
	            scope.alias = attr.rpPrettyIssuerDefault ? attr.rpPrettyIssuerDefault : '???';
	            return;
	          }
	          var aliasPromise = aliasService.getAliasForAddress(scope.issuer);
	          scope.alias = null;
	          aliasPromise.then(function (result) {
	            scope.alias = result;
	          });

	          scope.name = null;
	          if (scope.contacts) {
	            scope.name = webutil.isContact(scope.contacts, scope.issuer);
	          }

	          if (!scope.name && attr.rpPrettyIssuerOrShort) {
	            scope.name = "" + scope.issuer.substring(0,7) + "…";
	          }
	        }

	        scope.$watch('issuer', update);
	        scope.$watch('contacts', update, true);
	        update();
	      };
	    }
	  };
	}]);

	var RP_PRETTY_AMOUNT_DATE = 'rp-pretty-amount-date';

	module.directive('rpPrettyAmount', [function () {
	  return {
	    restrict: 'EA',
	    scope: {
	      amount: '=rpPrettyAmount'
	    },
	    template: '<span class="value">{{amount | rpamount:{reference_date:date} }}</span> ' +
	              '<span class="currency" rp-currency="amount"></span>',
	    compile: function (element, attr, linker) {
	      return function (scope, element, attr) {
	        scope.date = scope.date || element.inheritedData(RP_PRETTY_AMOUNT_DATE);
	      };
	    }
	  };
	}]);

	/**
	 * Set the reference date for rpPrettyAmount.
	 *
	 * You can set this on the same element that uses rpPrettyAmount or on any
	 * parent element.
	 *
	 * The reference date is used to calculate demurrage/interest correctly.
	 */
	module.directive('rpPrettyAmountDate', [function () {
	  return {
	    restrict: 'EA',
	    compile: function (element, attr, linker) {
	      return function (scope, element, attr) {
	        element.data(RP_PRETTY_AMOUNT_DATE, scope.$eval(attr.rpPrettyAmountDate));
	      };
	    }
	  };
	}]);

	module.directive('rpPrettyIdentity', [function () {
	  return {
	    restrict: 'EA',
	    scope: {
	      identity: '=rpPrettyIdentity'
	    },
	    template: '{{identity | rpcontactname}}',
	    compile: function (element, attr, linker) {
	      return function (scope, element, attr) {
	        // XXX Set title to identity
	      };
	    }
	  };
	}]);

	module.directive('rpBindColorAmount', function () {
	  return {
	    restrict: 'A',
	    compile: function (element, attr, linker) {
	      return function (scope, element, attr) {
	        scope.$watch(attr.rpBindColorAmount, function(value){
	          if (value) {
	            var parts = value.split(".");

	            if (parts.length === 2) { // you never know
	              var decimalPart = parts[1].replace(/0(0+)$/, '0<span class="insig">$1</span>');

	              element[0].innerHTML = decimalPart.length > 0 ? parts[0] + "." + decimalPart : parts[0];
	            }
	          }
	        });
	      };
	    }
	  };
	});

	module.directive('rpCurrency', function () {
	  return {
	    restrict: 'A',
	    compile: function (element, attr, linker) {
	      return function (scope, element, attr) {
	        scope.$watch(attr.rpCurrency, function (input) {
	          var currency;
	          if (input instanceof Currency) {
	            currency = input;
	          } else {
	            var amount = Amount.from_json(input);
	            currency = amount.currency();
	          }

	          var mainText = currency.to_human();

	          // Should we look for a full name like "USD - US Dollar"?
	          if (attr.rpCurrencyFull) {
	            var currencyInfo = $.grep(scope.currencies_all, function(e){ return e.value == mainText; })[0];
	            if (currencyInfo) mainText = currencyInfo.name;
	          }

	          if (currency.has_interest()) {
	            // Get yearly interest rate
	            var referenceDate = currency._interest_start + 3600 * 24 * 365;
	            var interestRate = currency.get_interest_at(referenceDate);

	            // Convert to percent and round to two decimal places
	            interestRate = Math.round(interestRate * 10000 - 10000) / 100;

	            var helpText;
	            if (interestRate > 0) {
	              // Positive interest
	              helpText = "Interest: "+interestRate+" %/yr";
	            } else {
	              // Fee
	              helpText = "Fee: "+(-interestRate)+"%/yr";
	            }

	            var el = $('<abbr></abbr>')
	                  .attr('title', helpText)
	                  .text(mainText);
	            element.empty().append(el);
	          } else {
	            element.empty().text(mainText);
	          }
	        });
	      };
	    }
	  };
	});


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * DIRECTIVES
	 *
	 * Miscellaneous directives go in this file.
	 */

	var module = angular.module('directives', ['popup']);

	/**
	 * Inline edit
	 */
	module.directive('inlineEdit', function() {
	  var previewTemplate = '<span ng-hide="mode">{{model}}</span>';
	  var editTemplate = '<input ng-show="mode" ng-model="model" />';

	  return {
	    restrict: 'E',
	    scope: {
	      model: '=',
	      mode: '='
	    },
	    template: previewTemplate + editTemplate
	  };
	});

	/**
	 * Group of validation errors for a form field.
	 *
	 * @example
	 *   <input name=send_destination ng-model=recipient>
	 *   <div rp-errors=send_destination>
	 *     <div rp-error-on=required>This field is required.</div>
	 *     <div rp-error-valid>{{recipient}} is a valid destination.</div>
	 *   </div>
	 */
	var RP_ERRORS = 'rp-errors';
	module.directive('rpErrors', [function() {
	  return {
	    restrict: 'EA',
	    compile: function(el, attr, linker) {
	      var fieldName = attr.rpErrors || attr.on,
	        errs = {};

	      el.data(RP_ERRORS, errs);
	      return function(scope, el) {
	        var formController = el.inheritedData('$formController');
	        var formName = formController.$name,
	          selectedTransclude,
	          selectedElement,
	          selectedScope;

	        function updateErrorTransclude() {
	          var field = formController[fieldName];

	          if (!field) return;

	          var $error = field && field.$error;

	          if (selectedElement) {
	            selectedScope.$destroy();
	            selectedElement.remove();
	            selectedElement = selectedScope = null;
	          }

	          // Pristine fields should show neither success nor failure messages
	          if (field.$pristine) return;

	          // Find any error messages defined for current errors
	          selectedTransclude = false;
	          $.each(errs, function(validator, transclude) {
	            if (validator.length <= 1) return;
	            if ($error && $error[validator.slice(1)]) {
	              selectedTransclude = transclude;
	              return false;
	            }
	          });

	          // Show message for valid fields
	          if (!selectedTransclude && errs['+'] && field.$valid) {
	            selectedTransclude = errs['+'];
	          }

	          // Generic message for invalid fields when there is no specific msg
	          if (!selectedTransclude && errs['?'] && field.$invalid) {
	            selectedTransclude = errs['?'];
	          }

	          if (selectedTransclude) {
	            scope.$eval(attr.change);
	            selectedScope = scope.$new();
	            selectedTransclude(selectedScope, function(errElement) {
	              selectedElement = errElement;
	              el.append(errElement);
	            });
	          }
	        }

	        scope.$watch(formName + '.' + fieldName + '.$error', updateErrorTransclude, true);
	        scope.$watch(formName + '.' + fieldName + '.$pristine', updateErrorTransclude);
	      };
	    }
	  };
	}]);

	/**
	 * Error message for validator failure.
	 *
	 * Use this directive within a rp-errors block to show a message for a specific
	 * validation failing.
	 *
	 * @example
	 *   <div rp-errors=send_destination>
	 *     <div rp-error-on=required>This field is required.</div>
	 *   </div>
	 */
	module.directive('rpErrorOn', [function() {
	  return {
	    transclude: 'element',
	    priority: 500,
	    compile: function(element, attrs, transclude) {
	      var errs = element.inheritedData(RP_ERRORS);
	      if (!errs) return;
	      errs['!' + attrs.rpErrorOn] = transclude;
	    }
	  };
	}]);

	/**
	 * Message for no matched validator failures.
	 *
	 * Use this directive within a rp-errors block to show a message if the field is
	 * invalid, but there was no error message defined for any of the failing
	 * validators.
	 *
	 * @example
	 *   <div rp-errors=send_destination>
	 *     <div rp-error-on=required>This field is required.</div>
	 *     <div rp-error-unknown>Invalid value.</div>
	 *   </div>
	 */
	module.directive('rpErrorUnknown', [function() {
	  return {
	    transclude: 'element',
	    priority: 500,
	    compile: function(element, attrs, transclude) {
	      var errs = element.inheritedData(RP_ERRORS);
	      if (!errs) return;
	      errs['?'] = transclude;
	    }
	  };
	}]);

	/**
	 * Message for field valid.
	 *
	 * Use this directive within a rp-errors block to show a message if the field is
	 * valid.
	 */
	module.directive('rpErrorValid', [function() {
	  return {
	    transclude: 'element',
	    priority: 500,
	    compile: function(element, attrs, transclude) {
	      var errs = element.inheritedData(RP_ERRORS);
	      if (!errs) return;
	      errs['+'] = transclude;
	    }
	  };
	}]);

	module.directive('rpConfirm', ['rpPopup', function(popup) {
	  return {
	    restrict: 'E',
	    link: function postLink(scope, element, attrs) {
	      // Could have custom or bootstrap modal options here
	      var popupOptions = {};
	      element.find('a,button').click(function(e) {
	        e.preventDefault();

	        popup.confirm(attrs["title"], attrs["actionText"],
	          attrs["actionButtonText"], attrs["actionFunction"], attrs["actionButtonCss"],
	          attrs["cancelButtonText"], attrs["cancelFunction"], attrs["cancelButtonCss"],
	          scope, popupOptions);
	      });
	    }
	  };
	}]);

	module.directive('rpPopup', ['rpPopup', '$parse', function(popup, $parse) {
	  return {
	    restrict: 'E',
	    link: function postLink(scope, element, attrs) {
	      var a = element.find('a[rp-popup-link]');
	      a.click(function(e) {
	        e.preventDefault();

	        // onShow action
	        if (attrs.rpPopupOnOpen) {
	          $parse(attrs.rpPopupOnOpen)(scope); 
	        }

	        var content = element.find('[rp-popup-content]');
	        xml = new XMLSerializer().serializeToString(content[0]);

	        popup.blank(xml, scope);
	        if (attrs.onopen && scope[attrs.onopen]) {
	          scope[attrs.onopen]();
	        }
	      });
	    }
	  };
	}]);

	// TODO Make it have different styling for different limits
	module.directive('rpInboundBridgeLimit', [function(){
	  return {
	    restrict: 'E',
	    scope: {
	      limit: '='
	    },
	    template: '<span> {{limit}} BTC </span>',
	    compile: function(element, attrs) {
	      element.addClass('test');
	    }
	  };
	}]);

	/*
	 * Adds download functionality to an element.
	 */
	module.directive('rpDownload', [function() {
	  return {
	    restrict: 'A',
	    scope: {
	      data: '=rpDownload',
	      filename: '@rpDownloadFilename'
	    },
	    compile: function(element, attr, linker) {
	      return function(scope, element, attr) {
	        var trigger = element.find('[rp-download-trigger]');
	        if (!trigger.length) trigger = element;

	        if ("download" in document.createElement("a")) {
	          scope.$watch('data', function(data) {
	            trigger.attr('href', "data:text/plain," + data);
	          });
	          scope.$watch('filename', function(filename) {
	            trigger.attr('download', filename);
	          });
	        } else if (swfobject.hasFlashPlayerVersion("10.0.0")) {
	          element.css('position', 'relative');

	          setImmediate(function() {
	            var width = trigger.innerWidth();
	            var height = trigger.innerHeight();
	            var offsetTrigger = trigger.offset();
	            var offsetElement = element.offset();
	            var topOffset = offsetTrigger.top - offsetElement.top;
	            var leftOffset = offsetTrigger.left - offsetElement.left;
	            var dl = Downloadify.create(element[0], {
	              filename: function() {
	                return scope.filename;
	              },
	              data: function() {
	                return scope.data;
	              },
	              transparent: true,
	              swf: 'swf/downloadify.swf',
	              downloadImage: 'img/transparent_l.gif',
	              width: width,
	              height: height,
	              append: true
	            });

	            var id = dl.flashContainer.id;
	            $('#' + id).css({
	              position: 'absolute',
	              top: topOffset + 'px',
	              left: leftOffset + 'px'
	            });
	          });
	        } else {
	          // XXX Should provide some alternative or error
	        }
	      };
	    }
	  };
	}]);

	/**
	 * Tooltips
	 */
	module.directive('rpTooltip', [function() {
	  return function(scope, element, attr) {
	    attr.$observe('rpTooltip', function(value) {
	      // Title
	      var options = {'title': value};

	      // Placement
	      if (attr.rpTooltipPlacement)
	        options.placement = attr.rpTooltipPlacement;

	      $(element).tooltip('destroy');
	      $(element).tooltip(options);
	    });
	  };
	}]);

	/**
	 * Popovers
	 */
	module.directive('rpPopover', [function() {
	  return function(scope, element, attr) {
	    if (!attr.rpPopoverTrigger) attr.rpPopoverTrigger = 'click';

	    $(element).popover({
	      html: true,
	      placement: attr.rpPopoverPlacement,
	      title: attr.rpPopoverTitle,
	      trigger: attr.rpPopoverTrigger
	      // TODO also use rpPopoverContent attribute (there's a bug with this)
	    });

	    $('html').click(function() {
	      $(element).popover('hide');
	    });

	    $(element).click(function(event){
	      event.stopPropagation();
	    });
	  };
	}]);

	module.directive('rpAutofill', ['$parse', function($parse) {
	  return {
	    restrict: 'A',
	    require: '?ngModel',
	    link: function($scope, element, attr, ctrl) {
	      if (!ctrl) return;

	      $scope.$watch(attr.rpAutofill, function(value) {
	        if (value) {
	          // Normalize amount
	          if (attr.rpAutofillAmount || attr.rpAutofillCurrency) {
	            // 1 XRP will be interpreted as 1 XRP, not 1 base unit
	            if (value === ("" + parseInt(value, 10))) {
	              value = value + '.0';
	            }

	            var amount = ripple.Amount.from_json(value);
	            if (!amount.is_valid()) return;
	            if (attr.rpAutofillAmount) {
	              value = +amount.to_human({
	                group_sep: false
	              });
	            } else {
	              value = amount.currency().to_json();
	            }
	          }

	          element.val(value);
	          ctrl.$setViewValue(value);
	          $scope.$eval(attr.rpAutofillOn);
	        }
	      }, true);
	    }
	  };
	}]);

	module.directive('rpSelectEl', [function() {
	  return {
	    restrict: 'A',
	    scope: {
	      target: '@rpSelectEl'
	    },
	    link: function($scope, element, attr) {
	      element.click(function() {
	        var doc = document;
	        var text = doc.getElementById($scope.target);

	        if (doc.body.createTextRange) { // ms
	          var range = doc.body.createTextRange();
	          range.moveToElementText(text);
	          range.select();
	        } else if (window.getSelection) { // moz, opera, webkit
	          var selection = window.getSelection();
	          var srange = doc.createRange();
	          srange.selectNodeContents(text);
	          selection.removeAllRanges();
	          selection.addRange(srange);
	        }
	      });
	    }
	  };
	}]);

	module.directive('rpNoPropagate', [function() {
	  return {
	    restrict: 'A',
	    link: function($scope, element, attr) {
	      element.click(function(e) {
	        e.stopPropagation();
	      });
	    }
	  };
	}]);

	/**
	 * Spinner
	 */
	module.directive('rpSpinner', [function() {
	  return {
	    restrict: 'A',
	    link: function(scope, element, attr) {
	      var spinner = null;
	      attr.$observe('rpSpinner', function(value) {
	        element.removeClass('spinner');
	        if (spinner) {
	          spinner.stop();
	          spinner = null;
	        }

	        if (value > 0) {
	          spinner = new Spinner({
	            lines: 9, // The number of lines to draw
	            length: 3, // The length of each line
	            width: 2, // The line thickness
	            radius: value, // The radius of the inner circle
	            className: 'spinnerInner'
	          });

	          // Spinner for input field
	          if (element.is('input')) {
	            element.after('<div class="inputSpinner"></div>');
	            spinner.spin(element.parent().find('.inputSpinner')[0]);
	          }

	          // Spinner for everything else
	          else {
	            element.addClass('spinner');
	            spinner.spin(element[0]);
	          }
	        }
	      });
	    }
	  };
	}]);


	// Version 0.2.0
	// AngularJS simple file upload directive
	// this directive uses an iframe as a target
	// to enable the uploading of files without
	// losing focus in the ng-app.
	//
	// <div ng-app="app">
	//   <div ng-controller="mainCtrl">
	//    <form action="/uploads" ng-upload="results()">
	//      <input type="file" name="avatar"></input>
	//      <input type="submit" value="Upload"></input>
	//    </form>
	//  </div>
	// </div>
	//
	//  angular.module('app', ['ngUpload'])
	//    .controller('mainCtrl', function($scope) {
	//      $scope.results = function(content) {
	//        console.log(content);
	//      }
	//  });
	//
	//
	module.directive('ngUpload', function() {
	  return {
	    restrict: 'A',
	    link: function(scope, element, attrs) {

	      // Options (just 1 for now)
	      // Each option should be prefixed with 'upload-Options-' or 'uploadOptions'
	      // {
	      //    // specify whether to enable the submit button when uploading forms
	      //    enableControls: bool
	      // }
	      var options = {};
	      options.enableControls = attrs['uploadOptionsEnableControls'];

	      // get scope function to execute on successful form upload
	      if (attrs['ngUpload']) {

	        element.attr("target", "upload_iframe");
	        element.attr("method", "post");

	        // Append a timestamp field to the url to prevent browser caching results
	        element.attr("action", element.attr("action") + "?_t=" + new Date().getTime());

	        element.attr("enctype", "multipart/form-data");
	        element.attr("encoding", "multipart/form-data");

	        // Retrieve the callback function
	        var fn = attrs['ngUpload'].split('(')[0];
	        var callbackFn = scope.$eval(fn);
	        if (callbackFn === null || callbackFn === undefined || !angular.isFunction(callbackFn)) {
	          var message = "The expression on the ngUpload directive does not point to a valid function.";
	          // console.error(message);
	          throw message + "\n";
	        }

	        // Helper function to create new iframe for each form submission
	        var addNewDisposableIframe = function(submitControl) {
	          // create a new iframe
	          var iframe = $("<iframe id='upload_iframe' name='upload_iframe' border='0' width='0' height='0' style='width: 0px; height: 0px; border: none; display: none' />");

	          // attach function to load event of the iframe
	          iframe.bind('load', function() {

	            // get content - requires jQuery
	            var content = iframe.contents().find('body').text();

	            // execute the upload response function in the active scope
	            scope.$apply(function() {
	              callbackFn(content, content !== "" /* upload completed */ );
	            });

	            // remove iframe
	            if (content !== "") // Fixes a bug in Google Chrome that dispose the iframe before content is ready.
	            setTimeout(function() {
	              iframe.remove();
	            }, 250);

	            //if (options.enableControls == null || !(options.enableControls.length >= 0))
	            submitControl.attr('disabled', null);
	            submitControl.attr('title', 'Click to start upload.');
	          });

	          // add the new iframe to application
	          element.parent().append(iframe);
	        };

	        // 1) get the upload submit control(s) on the form (submitters must be decorated with the 'ng-upload-submit' class)
	        // 2) attach a handler to the controls' click event
	        $('.upload-submit', element).click(

	        function() {

	          addNewDisposableIframe($(this) /* pass the submit control */ );

	          scope.$apply(function() {
	            callbackFn("Please wait...", false /* upload not completed */ );
	          });

	          //console.log(angular.toJson(options));

	          var enabled = true;
	          if (options.enableControls === null || options.enableControls === undefined || options.enableControls.length >= 0) {
	            // disable the submit control on click
	            $(this).attr('disabled', 'disabled');
	            enabled = false;
	          }

	          $(this).attr('title', (enabled ? '[ENABLED]: ' : '[DISABLED]: ') + 'Uploading, please wait...');

	          // submit the form
	          $(element).submit();
	        }).attr('title', 'Click to start upload.');
	      } else console.log("No callback function found on the ngUpload directive.");
	    }
	  };
	});

	/**
	 * Focus element on render
	 */
	module.directive('rpFocus', ['$timeout', function($timeout) {
	  return function($scope, element) {
	    $timeout(function(){
	      $scope.$watch(function () {return element.is(':visible')}, function(newValue) {
	        if (newValue === true)
	          element.focus();
	      })
	    })
	  }
	}]);

	module.directive('rpOffCanvasMenu', function() {
	  return {
	    restrict: 'A',
	    link: function(scope, element, attrs) {
	      element.find('h2').click(function () {
	        element.parent().toggleClass('off-canvas-nav-expand');
	      });
	    }
	  };
	});

	module.directive('rpSnapper', ['rpId', function($id) {
	  return function($scope) {
	    // Initialize snapper only if user is logged in.
	    var watcher = $scope.$watch(function(){return $id.loginStatus}, function(){
	      var snapper;

	      if ($id.loginStatus) {
	        setImmediate(function(){
	          snapper = new Snap({
	            element: document.getElementById('wrapper'),
	            disable: 'right'
	          });

	          // Check
	          checkSize();

	          // Snapper toggle button
	          $('.snapper-toggle').click(function(){
	            snapper.state().state == 'closed' ? snapper.open('left') : snapper.close()
	          });

	          $('.mobile-nav').find('a').click(function(){
	            snapper.close();
	          });
	        });

	        // Activate if resized to mobile size
	        $(window).resize(function(){
	          checkSize();
	        });

	        var checkSize = function(){
	          // screen-xs-max
	          if ('object' === typeof snapper) {
	            if ($(window).width() > 767) {
	              snapper.close();
	              snapper.disable();
	            } else {
	              $('.mobile-nav').show();
	              snapper.enable();
	            }
	          }
	        };

	        // Remove watcher
	        watcher();
	      }
	    });
	  }
	}]);

	/**
	 * Adds spacing around span tags.
	 */
	module.directive('rpSpanSpacing', [function () {
	  return {
	    restrict: 'EA',
	    compile: function (element, attr, linker) {
	      element.find('> span').before(' ').after(' ');
	    }
	  };
	}]);


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * DATALINKS
	 *
	 * Data-centric links for things like transactions, accounts etc.
	 */

	var module = angular.module('datalinks', []);

	module.directive('rpLinkTx', ['$location', function ($location) {
	  return {
	    restrict: 'A',
	    link: function ($scope, element, attr) {
	      var url;
	      $scope.$watch(attr.rpLinkTx, function (hash) {
	        url;
	      });
	      element.click(function () {
	        $scope.$apply(function () {
	          if (url) $location.url(url);
	        });
	      });
	    }
	  };
	}]);


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * ERRORS
	 *
	 * Directives related to errors and error messages.
	 */

	var module = angular.module('errors', []);

	/**
	 * Trust line graph. (Similar to small box plot.)
	 */
	module.directive('rpTransactionStatus', function() {
	  return {
	    restrict: 'E',
	    template: __webpack_require__(61),
	    scope: {
	      engine_result: '@rpEngineResult',
	      engine_result_message: '@rpEngineResultMessage',
	      accepted: '@rpAccepted'
	    },
	    link: function(scope, elm, attrs) {
	    }
	  };
	});


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * QR
	 *
	 * Directive to render a QR code.
	 */

	var module = angular.module('qr', []);

	/**
	 * angular-qrcode v3.1.0
	 * (c) 2013 Monospaced http://monospaced.com
	 * License: MIT
	 */
	module.directive('rpQrcode', ['$window', function($window) {
	  var canvas2D = !!$window.CanvasRenderingContext2D,
	      levels = {
	        'L': 'Low',
	        'M': 'Medium',
	        'Q': 'Quartile',
	        'H': 'High'
	      },
	      draw = function(context, qr, modules, tile) {
	        for (var row = 0; row < modules; row++) {
	          for (var col = 0; col < modules; col++) {
	            var w = (Math.ceil((col + 1) * tile) - Math.floor(col * tile)),
	                h = (Math.ceil((row + 1) * tile) - Math.floor(row * tile));

	            context.fillStyle = qr.isDark(row, col) ? '#000' : '#fff';
	            context.fillRect(Math.round(col * tile),
	                             Math.round(row * tile), w, h);
	          }
	        }
	      };

	  return {
	    restrict: 'E',
	    template: '<canvas></canvas>',
	    link: function(scope, element, attrs) {
	      var domElement = element[0],
	          canvas = element.find('canvas')[0],
	          context = canvas2D ? canvas.getContext('2d') : null,
	          trim = /^\s+|\s+$/g,
	          error,
	          version,
	          errorCorrectionLevel,
	          data,
	          size,
	          modules,
	          tile,
	          qr,
	          setVersion = function(value) {
	            version = Math.max(1, Math.min(parseInt(value, 10), 10)) || 4;
	          },
	          setErrorCorrectionLevel = function(value) {
	            errorCorrectionLevel = value in levels ? value : 'M';
	          },
	          setData = function(value) {
	            if (!value) {
	              return;
	            }

	            data = value.replace(trim, '');
	            qr = qrcode(version, errorCorrectionLevel);
	            qr.addData(data);

	            try {
	              qr.make();
	            } catch(e) {
	              error = e.message;
	              return;
	            }

	            error = false;
	            modules = qr.getModuleCount();
	          },
	          setSize = function(value) {
	            size = parseInt(value, 10) || modules * 2;
	            tile = size / modules;
	            canvas.width = canvas.height = size;
	          },
	          render = function() {
	            if (!qr) {
	              return;
	            }

	            if (error) {
	              if (!canvas2D) {
	                domElement.innerHTML = '<img src width="' + size + '"' +
	                  'height="' + size + '">';
	              }
	              scope.$emit('qrcode:error', error);
	              return;
	            }

	            if (canvas2D) {
	              draw(context, qr, modules, tile);
	            } else {
	              domElement.innerHTML = qr.createImgTag(tile, 0);
	            }
	          };

	      setVersion(attrs.version);
	      setErrorCorrectionLevel(attrs.errorCorrectionLevel);
	      setSize(attrs.size);

	      attrs.$observe('version', function(value) {
	        if (!value) {
	          return;
	        }

	        setVersion(value);
	        setData(data);
	        setSize(size);
	        render();
	      });

	      attrs.$observe('errorCorrectionLevel', function(value) {
	        if (!value) {
	          return;
	        }

	        setErrorCorrectionLevel(value);
	        setData(data);
	        setSize(size);
	        render();
	      });

	      attrs.$observe('data', function(value) {
	        if (!value) {
	          return;
	        }

	        setData(value);
	        setSize(size);
	        render();
	      });

	      attrs.$observe('size', function(value) {
	        if (!value) {
	          return;
	        }

	        setSize(value);
	        render();
	      });
	    }
	  };
	}]);


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var module = angular.module('filters', []),
	    webutil = __webpack_require__(52),
	    Amount = ripple.Amount,
	    Currency = ripple.Currency,
	    Base = ripple.Base;

	var iso4217 = __webpack_require__(60);

	/**
	 * Format a ripple.Amount.
	 *
	 * If the parameter is a number, the number is treated the relative
	 */
	module.filter('rpamount', function () {
	  return function (input, options) {
	    var opts = jQuery.extend(true, {}, options);

	    if ("number" === typeof opts) {
	      opts = {
	        rel_min_precision: opts
	      };
	    } else if ("object" !== typeof opts) {
	      opts = {};
	    }

	    if (!input) return "n/a";

	    if (opts.xrp_human && input === ("" + parseInt(input, 10))) {
	      input = input + ".0";
	    }

	    // Reference date
	    // XXX Should maybe use last ledger close time instead
	    if (!opts.reference_date && !opts.no_interest) {
	      opts.reference_date = new Date();
	    }

	    var amount = Amount.from_json(input);
	    if (!amount.is_valid()) return "n/a";

	    // Currency default precision
	    var currency = iso4217[amount.currency().to_human()];
	    var cdp = ("undefined" !== typeof currency) ? currency[1] : 4;

	    // Certain formatting options are relative to the currency default precision
	    if ("number" === typeof opts.rel_precision) {
	      opts.precision = cdp + opts.rel_precision;
	    }
	    if ("number" === typeof opts.rel_min_precision) {
	      opts.min_precision = cdp + opts.rel_min_precision;
	    }

	    // If no precision is given, we'll default to max precision.
	    if ("number" !== typeof opts.precision) {
	      opts.precision = 16;
	    }

	    // But we will cut off after five significant decimals
	    if ("number" !== typeof opts.max_sig_digits) {
	      opts.max_sig_digits = 5;
	    }

	    var out = amount.to_human(opts);

	    // If amount is very small and only has zeros (ex. 0.0000), raise precision
	    // to make it useful.
	    if (out.length > 1 && 0 === +out && !opts.hard_precision) {
	      opts.precision = 20;

	      out = amount.to_human(opts);
	    }

	    return out;
	  };
	});

	/**
	 * Get the currency from an Amount or Currency object.
	 *
	 * If the input is neither an Amount or Currency object it will be passed to
	 * Amount#from_json to try to interpret it.
	 */
	module.filter('rpcurrency', function () {
	  return function (input) {
	    if (!input) return "";

	    var currency;
	    if (input instanceof Currency) {
	      currency = input;
	    } else {
	      var amount = Amount.from_json(input);
	      currency = amount.currency();
	    }

	    return currency.to_human();
	  };
	});

	/**
	 * Get the currency issuer.
	 */
	module.filter('rpissuer', function () {
	  return function (input) {
	    if (!input) return "";

	    var amount = Amount.from_json(input);
	    return amount.issuer().to_json();
	  };
	});

	/**
	 * Get the full currency name from an Amount.
	 */
	module.filter('rpcurrencyfull', ['$rootScope', function ($scope) {
	  return function (input) {
	    if (!input) return "";

	    var amount = Amount.from_json(input);
	    var currency = $.grep($scope.currencies_all, function(e){ return e.value == amount.currency().to_human(); })[0];

	    if (currency) {
	      return currency.name;
	    } else {
	      return amount.currency().to_human();
	    }
	  };
	}]);

	/**
	 * Calculate a ratio of two Amounts.
	 */
	module.filter('rpamountratio', function () {
	  return function (numerator, denominator) {
	    try {
	      return Amount.from_json(numerator).ratio_human(denominator, {reference_date: new Date()});
	    } catch (err) {
	      return Amount.NaN();
	    }
	  };
	});

	/**
	 * Calculate the sum of two Amounts.
	 */
	module.filter('rpamountadd', function () {
	  return function (a, b) {
	    try {
	      b = Amount.from_json(b);
	      if (b.is_zero()) return a;
	      return Amount.from_json(a).add(b);
	    } catch (err) {
	      return Amount.NaN();
	    }
	  };
	});
	/**
	 * Calculate the difference of two Amounts.
	 */
	module.filter('rpamountsubtract', function () {
	  return function (a, b) {
	    try {
	      return Amount.from_json(a).subtract(b);
	    } catch (err) {
	      return Amount.NaN();
	    }
	  };
	});

	/**
	 * Angular filter for Moment.js.
	 *
	 * Displays a timestamp as "x minutes ago".
	 */
	var momentCache = {};

	module.filter('rpfromnow', function () {
	  return function (input) {
	    // This is an expensive function, cache it
	    if (!momentCache[input]) momentCache[input] = moment(input).fromNow();

	    return momentCache[input];
	  };
	});

	/**
	 * Show Ripple Name
	 *
	 * Shows a ripple name for a given ripple address
	 */
	module.filter("rpripplename", ['$rootScope', '$http', function($scope, $http) {
	  var resolvedNames = [],
	    serviceInvoked = [];

	  function realFilter(address) {
	    return resolvedNames[address];
	  }

	  return function(address, options) {
	    var strippedValue = webutil.stripRippleAddress(address);
	    var rpAddress = ripple.UInt160.from_json(address);
	    if (!rpAddress.is_valid()) return address;

	    var opts = jQuery.extend(true, {}, options);

	    if(!resolvedNames[address]) {
	      if(!serviceInvoked[address]) {
	        serviceInvoked[address] = true;

	        // Get the blobvault url
	        ripple.AuthInfo.get(Options.domain, "1", function(err, authInfo) {
	          if (err) {
	            console.log("Can't get the authinfo", err);
	          }

	          // Get the user
	          $http.get(authInfo.blobvault + '/v1/user/' + address)
	            .success(function(data) {
	              if (data.username) {
	                if (opts.tilde === true) {
	                  resolvedNames[address] = "~".concat(data.username);
	                } else {
	                  resolvedNames[address] = data.username;
	                }
	              } else {
	                // Show the ripple address if there's no name associated with it
	                resolvedNames[address] = address;
	              }
	            })
	            .error(function(err){
	              console.log("Can't get the blobvault", err);
	            });
	        });
	      }
	      return address;
	    }
	    else return realFilter(address);  
	  }
	}]);

	/**
	 * Show contact name or short address
	 */
	module.filter('rpcontactname', ['$rootScope', function ($scope) {
	  return function (address) {
	    address = address ? ""+address : "";

	    var contact = webutil.getContact($scope.userBlob.data.contacts, address);

	    if (!contact) {
	      return "" + address.substring(0,7) + "…";
	    }

	    return contact.name;
	  };
	}]);

	module.filter('rpcontactnamefull', ['$rootScope', function ($scope) {
	  return function (address) {
	    address = address ? ""+address : "";
	    var contact = webutil.getContact($scope.userBlob.data.contacts, address);

	    if (!contact) {
	      return "" + address;
	    }

	    return contact.name;
	  };
	}]);

	module.filter('rponlycontactname', ['$rootScope', function ($scope) {
	  return function (address) {
	    address = address ? ""+address : "";

	    var contact = webutil.getContact($scope.userBlob.data.contacts, address);

	    if (contact) {
	      return contact.name;
	    }
	  };
	}]);

	/**
	 * Masks a string like so: •••••.
	 *
	 * The number of the bullets will correspond to the length of the string.
	 */
	module.filter('rpmask', function () {
	  return function (pass) {
	    pass = ""+pass;
	    return Array(pass.length+1).join("•");
	  };
	});

	/**
	 * Crops a string to len characters
	 *
	 * The number of the bullets will correspond to the length of the string.
	 */
	module.filter('rptruncate', function () {
	  return function (str, len) {
	    return str ? str.slice(0, len) : '';
	  };
	});

	/**
	 * Format a file size.
	 *
	 * Based on code by aioobe @ StackOverflow.
	 * @see http://stackoverflow.com/questions/3758606
	 */
	module.filter('rpfilesize', function () {
	  function number_format( number, decimals, dec_point, thousands_sep ) {
	    // http://kevin.vanzonneveld.net
	    // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
	    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	    // +     bugfix by: Michael White (http://crestidg.com)
	    // +     bugfix by: Benjamin Lupton
	    // +     bugfix by: Allan Jensen (http://www.winternet.no)
	    // +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
	    // *     example 1: number_format(1234.5678, 2, '.', '');
	    // *     returns 1: 1234.57

	    var n = number, c = isNaN(decimals = Math.abs(decimals)) ? 2 : decimals;
	    var d = dec_point === undefined ? "," : dec_point;
	    var t = thousands_sep === undefined ? "." : thousands_sep, s = n < 0 ? "-" : "";
	    var i = parseInt(n = Math.abs(+n || 0).toFixed(c), 10) + "", j = (j = i.length) > 3 ? j % 3 : 0;

	    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
	  }

	  // SI (International System of Units)
	  // e.g. 1000 bytes = 1 kB
	  var unit = 1000;
	  var prefixes = "kMGTPE";
	  var common = "B";

	  // Binary system
	  // e.g. 1024 bytes = 1 KiB
	  //var unit = 1024
	  //var prefixes = "KMGTPE";
	  //var common = "iB";

	  return function (str) {
	    var bytes = +str;
	    if (bytes < unit) return bytes + " B";
	    var exp = Math.floor(Math.log(bytes) / Math.log(unit));
	    var pre = " "+prefixes[exp-1] + common;
	    return number_format(bytes / Math.pow(unit, exp), 2, '.', '')+pre;
	  };
	});

	/**
	 * Uppercase the first letter.
	 */
	module.filter('rpucfirst', function () {
	  return function (str) {
	    str = ""+str;
	    return str.charAt(0).toUpperCase() + str.slice(1);
	  };
	});

	/**
	 * Something similar to javascript for loop
	 *
	 * Usage
	 * Example1 : ng-repeat="n in [20] | rprange"
	 * Example2 : ng-repeat="n in [10, 35] | rprange"
	 */
	module.filter('rprange', function() {
	  return function(input) {
	    var lowBound, highBound;
	    switch (input.length) {
	      case 1:
	        lowBound = 0;
	        highBound = parseInt(input[0], 10) - 1;
	        break;
	      case 2:
	        lowBound = parseInt(input[0], 10);
	        highBound = parseInt(input[1], 10);
	        break;
	      default:
	        return input;
	    }
	    var result = [];
	    for (var i = lowBound; i <= highBound; i++)
	      result.push(i);
	    return result;
	  };
	});

	module.filter('rpaddressorigin', function() {
	  return function(recipient) {
	    return !isNaN(Base.decode_check([0, 5], recipient, 'bitcoin')) ? 'bitcoin' : 'ripple';
	  };
	});

	module.filter('rpheavynormalize', function () {
	  return function (value, maxLength) {
	    return String(value)
	      // Remove non-printable and non-ASCII characters
	      .replace(/[^ -~]/g, '')
	      // Enforce character limit
	      .substr(0, maxLength || 160)
	      // Remove leading whitespace
	      .replace(/^\s+/g, '')
	      // Remove trailing whitespace
	      .replace(/\s+$/g, '')
	      // Normalize all other whitespace
	      .replace(/\s+/g, ' ');
	  };
	});


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var globals = angular.module('app.globals', []);

	/*
	We want to be able to inject mocks into tests with dependencies on these globals
	*/

	// deps/js/store.js
	globals.constant('store', store);
	// config.js
	globals.constant('Options', Options);


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * ID
	 *
	 * The id service is used for user identification and authorization.
	 */

	var util = __webpack_require__(76),
	    Base58Utils = __webpack_require__(51),
	    RippleAddress = __webpack_require__(1).RippleAddress;

	var module = angular.module('id', ['authflow', 'blob', 'oldblob']);

	module.factory('rpId', ['$rootScope', '$location', '$route', '$routeParams',
	                        'rpAuthFlow', 'rpBlob', 'rpOldBlob',
	                        function($scope, $location, $route, $routeParams,
	                                 $authflow, $blob, $oldblob)
	{
	  /**
	   * Identity manager
	   *
	   * This class manages the encrypted blob and all user-specific state.
	   */
	  var Id = function ()
	  {
	    this.account = null;
	    this.loginStatus = false;
	  };

	  // This object defines the minimum structure of the blob.
	  //
	  // This is used to ensure that the blob we get from the server has at least
	  // these fields and that they are of the right types.
	  Id.minimumBlob = {
	    data: {
	      contacts: [],
	      preferred_issuer: {},
	      preferred_second_issuer: {}
	    },
	    meta: []
	  };

	  // The default blob is the blob that a new user gets.
	  //
	  // Right now this is equal to the minimum blob, but we may define certain
	  // default values here in the future.
	  Id.defaultBlob = Id.minimumBlob;

	  /**
	   * Reduce username to standardized form.
	   *
	   * This creates the version of the username that is displayed in the UI.
	   */
	  Id.normalizeUsernameForDisplay = function (username) {
	    username = ""+username;

	    // Strips whitespace at beginning and end.
	    username = username.trim();

	    return username;
	  };

	  /**
	   * Reduce username to standardized form.
	   *
	   * This version is used in the login system and it's the version sent to
	   * servers.
	   */
	  Id.normalizeUsernameForInternals = function (username) {
	    username = ""+username;

	    // Strips whitespace at beginning and end.
	    username = username.trim();

	    // Remove hyphens
	    username = username.replace(/-/g, '');

	    // All lowercase
	    username = username.toLowerCase();

	    return username;
	  };

	  /**
	   * Reduce username to the oldBlob standardized form.
	   *
	   * This version is used in the login system and it's the version sent to
	   * servers.
	   */
	  Id.normalizeUsernameForOldBlob = function (username) {
	    // The old blob does not remove hyphens

	    username = ""+username;

	    // Strips whitespace at beginning and end.
	    username = username.trim();

	    // All lowercase
	    username = username.toLowerCase();

	    return username;
	  };

	  /**
	   * Reduce password to standardized form.
	   *
	   * Strips whitespace at beginning and end.
	   */
	  Id.normalizePassword = function (password) {
	    password = ""+password;
	    password = password.trim();
	    return password;
	  };

	  Id.prototype.init = function ()
	  {
	    var self = this;

	    // Initializing sjcl.random doesn't really belong here, but there is no other
	    // good place for it yet.
	    for (var i = 0; i < 8; i++) {
	      sjcl.random.addEntropy(Math.random(), 32, "Math.random()");
	    }

	    $scope.userBlob = Id.defaultBlob;
	    $scope.userCredentials = {};

	    $scope.$watch('userBlob',function(){
	      // XXX Maybe the blob service should handle this stuff?
	      $scope.$broadcast('$blobUpdate');

	      // XXX What's the equivalent in the new login API?
	      /*
	      if (self.username && self.password) {
	        $oldblob.set(...,
	                  self.username.toLowerCase(), self.password,
	                  $scope.userBlob,function(){
	                    $scope.$broadcast('$blobSave');
	                  });
	      }
	      */
	    },true);

	    $scope.$on('$blobUpdate', function(){
	      // Account address
	      if (!$scope.address && $scope.userBlob.data.account_id) {
	        $scope.address = $scope.userBlob.data.account_id;
	      }
	    });

	    if (!!store.get('ripple_auth')) {
	      
	      self.relogin(function(err, blob) {
	        if (!blob) {
	          self.logout();  
	          $location.path('/login');
	        }
	      });
	    }
	  };

	  Id.prototype.setUsername = function (username)
	  {
	    this.username = username;
	    $scope.userCredentials.username = username;
	    $scope.$broadcast('$idUserChange', {username: username});
	  };

	  Id.prototype.setAccount = function (accId)
	  {
	    if (this.account !== null) {
	      $scope.$broadcast('$idAccountUnload', {account: accId});
	    }
	    this.account = accId;
	    $scope.userCredentials.account = accId;
	    $scope.$broadcast('$idAccountLoad', {account: accId});
	  };

	  Id.prototype.setLoginKeys = function (keys)
	  {
	    this.keys = keys;
	  };

	  Id.prototype.isReturning = function ()
	  {
	    return !!store.get('ripple_known');
	  };

	  Id.prototype.isLoggedIn = function ()
	  {
	    return this.loginStatus;
	  };

	  Id.prototype.storeLoginKeys = function (url, username, keys)
	  {
	    store.set('ripple_auth', {url:url, username: username, keys: keys});
	  };

	  Id.prototype.verify = function (opts, callback) {
	    $authflow.verify(opts, callback);
	  };

	  Id.prototype.resendEmail = function (opts, callback) {
	    $authflow.resendEmail(opts, callback);
	  };

	  Id.prototype.rename = function (opts, callback) {
	    opts.blob = $scope.userBlob;
	    opts.url = $scope.userBlob.url;
	    opts.username = this.username;

	    $authflow.rename(opts, callback);
	  };

	  Id.prototype.register = function (opts, callback)
	  {
	    var self = this;

	    // If account master key is not present, generate one
	    var masterkey = !!opts.masterkey
	      ? opts.masterkey
	      : Base58Utils.encode_base_check(33, sjcl.codec.bytes.fromBits(sjcl.random.randomWords(4)));

	    // Callback is optional
	    if ("function" !== typeof callback) callback = $.noop;

	    // Username is empty for the desktop client
	    if (!opts.username) opts.username = 'local';

	    // Blob data
	    var username = Id.normalizeUsernameForDisplay(opts.username);
	    var password = Id.normalizePassword(opts.password);
	    var account  = (new RippleAddress(masterkey)).getAddress();

	    $authflow.register({
	      'username': username,
	      'password': password,
	      'account': account,
	      'email': opts.email,
	      'masterkey': masterkey,
	      'oldUserBlob': opts.oldUserBlob,
	      'walletfile': opts.walletfile
	    },
	    function (err, blob, keys) {
	      if (err) {
	        console.log("client: id: registration failed:", (err && err.stack) ? err.stack : err);
	        callback(err);
	        return;
	      }

	      $scope.userBlob = blob;

	      self.setUsername(username);

	//      self.setAccount(blob.data.account_id);
	//      self.setLoginKeys(keys);
	//      self.storeLoginKeys(username, keys);
	//      self.loginStatus = true;
	//      $scope.$broadcast('$blobUpdate');

	      if ('desktop' === $scope.client) {
	        self.setAccount(blob.data.account_id);
	        self.loginStatus = true;
	        $scope.$broadcast('$blobUpdate');
	      }

	      // Remove old blob
	      if(Options.blobvault) {
	        $oldblob.remove(['vault', 'local'], opts.oldUsername, opts.oldPassword, function (err, data) {
	          if (err) {
	            console.log("Can't delete the old blobvault:", err);
	            return;
	          }

	          console.log('Old blob has been removed.');
	        });
	      }

	      store.set('ripple_known', true);
	      callback(null, masterkey);
	    });
	  };

	  Id.prototype.exists = function (username, password, callback)
	  {
	    var self = this;

	    username = Id.normalizeUsernameForDisplay(username);
	    password = Id.normalizePassword(password);

	    $authflow.exists(Id.normalizeUsernameForInternals(username), password, function (err, data) {
	      if (!err && data) {
	        // Blob found, new auth method
	        callback(null, true);
	      } else {
	        // No blob found
	        callback(null, false);
	      }
	    });
	  };

	  Id.prototype.oldLogin = function (opts, callback) {
	    var self = this;

	    // Callback is optional
	    if ("function" !== typeof callback) callback = $.noop;

	    var username = Id.normalizeUsernameForDisplay(opts.username);
	    var password = Id.normalizePassword(opts.password);
	    var oldBlobUsername = Id.normalizeUsernameForOldBlob(username);

	    $oldblob.get(['vault'], oldBlobUsername, password, function (oerr, data) {
	//      $location.path('/register');

	      if (oerr) {
	        // Old blob failed - since this was just the fallback report the
	        // original error
	        console.log("Old backend reported:", oerr);
	        callback(oerr);
	        return;
	      }

	      var blob = $oldblob.decrypt(oldBlobUsername, password, data);
	      if (!blob) {
	        // Unable to decrypt blob
	        var msg = 'Unable to decrypt blob (Username / Password is wrong)';
	        callback(new Error(msg));
	      } else if (blob.old && !self.allowOldBlob) {
	        var oldBlobErr = new Error('Old blob format detected');
	        oldBlobErr.name = "OldBlobError";
	        callback(oldBlobErr);
	      } else {
	        // Migration

	        $scope.oldUserBlob = blob;
	        $scope.oldUsername = oldBlobUsername;
	        $scope.oldPassword = password;
	        $location.path('/register');

	        return;
	      }
	    });
	  };

	  Id.prototype.login = function (opts, callback)
	  {
	    var self = this;

	    // Callback is optional
	    if ("function" !== typeof callback) callback = $.noop;

	    var username = Id.normalizeUsernameForDisplay(opts.username);
	    var password = Id.normalizePassword(opts.password);
	    var deviceID = opts.device_id || store.get('device_id');

	    $authflow.login({
	      'username': Id.normalizeUsernameForInternals(username),
	      'password': password,
	      'walletfile': opts.walletfile,
	      'device_id' : deviceID
	    }, function (err, blob, keys, actualUsername, emailVerified) {
	      
	      //handle 2FA
	      if (err && err.twofactor) {
	 
	        //request verification token. If they are using the
	        //app, the request will be ignored.
	        $authflow.requestToken(err.twofactor.blob_url, err.twofactor.blob_id, false, function(tokenError, tokenResp) {
	          
	          //keep this for reporting
	          err.twofactor.tokenError    = tokenError; 
	          err.twofactor.tokenResponse = tokenResp;
	          return callback(err);
	        });
	        
	      } else if (err) {
	        // New login protocol failed and no fallback configured
	        callback(err);
	      } else {
	        // Ensure certain properties exist
	        $.extend(true, blob, Id.minimumBlob);

	        // Ripple's username system persists the capitalization of the username,
	        // even though usernames are case-insensitive. That's why we want to use
	        // the "actualUsername" that the server returned.
	        //
	        // However, we want this to never be a source for problems, so we'll
	        // ensure the actualUsername returned is equivalent to what we expected
	        // and fall back to what the user entered otherwise.
	        if ("string" !== typeof actualUsername ||
	            Id.normalizeUsernameForInternals(actualUsername) !== Id.normalizeUsernameForInternals(username)) {
	          actualUsername = username;
	        }

	        $scope.userBlob = blob;
	        self.setUsername(actualUsername);

	        if (!emailVerified) {
	          $scope.unverified = true;
	          $location.path('/register');

	          callback(new Error("Email has not been verified!"));
	          return;
	        }

	        self.setAccount(blob.data.account_id);
	        self.setLoginKeys(keys);
	        self.storeLoginKeys(blob.url, actualUsername, keys);
	        store.set('device_id', blob.device_id);
	        self.loginStatus = true;
	        $scope.$broadcast('$blobUpdate');
	        store.set('ripple_known', true);

	        if (blob.data.account_id) {
	          // Success
	          callback(null);
	        } else {
	          // Invalid blob
	          callback(new Error("Blob format unrecognized!"));
	        }
	      }
	    });
	  };
	  
	  Id.prototype.relogin = function (callback) {
	    var self     = this;
	    var auth     = store.get('ripple_auth');
	    var deviceID = store.get('device_id');
	    if (!auth || !auth.keys) {
	      return callback(new Error('Missing authentication keys'));
	    }
	    
	    // XXX This is technically not correct, since we don't know yet whether
	    //     the login will succeed. But we need to set it now, because the page
	    //     controller will likely query it long before we get a response from
	    //     the login system.
	    //
	    //     Will work fine as long as any relogin error triggers a logout and
	    //     logouts trigger a full page reload.
	    self.loginStatus = true;    
	    
	    $authflow.relogin(auth.url, auth.keys, deviceID, function (err, blob) {
	      
	      if (err) {
	        
	        // Failed to relogin
	        console.log("client: id: failed to relogin:", err.message || err.toString());
	        callback(err);        
	        
	      } else {
	        // Ensure certain properties exist
	        $.extend(true, blob, Id.minimumBlob);

	        $scope.userBlob = blob;
	        self.setUsername(auth.username);
	        self.setAccount(blob.data.account_id);
	        self.setLoginKeys(auth.keys);
	        self.loginStatus = true;
	        $scope.$broadcast('$blobUpdate');
	        store.set('ripple_known', true);
	        callback(null, blob);
	      }
	    });    
	  };

	  Id.prototype.verifyToken = function (options, callback) {
	    store.set('remember_me', options.remember_me);
	    $authflow.verifyToken(options, callback);    
	  }; 
	  
	  Id.prototype.changePassword = function (options, callback) {
	    var self = this;
	    
	    $authflow.changePassword(options, function(err, resp) {  
	      
	      if (err) {
	        return callback(err);
	      }
	      
	      //NOTE: the section below changed so that you can recover with 2FA enabled
	      //We should be checking attestation statuses here also.
	      
	      //perform login, so that the email verification is checked
	      //and the username, blob, and keys get stored.
	      //self.login(options, callback); 
	      
	      var keys = {id:options.blob.id,crypt:options.blob.key};
	      
	      $scope.userBlob = options.blob;
	      self.setUsername(options.username);
	      self.setAccount(options.blob.data.account_id);
	      self.setLoginKeys(keys);
	      self.storeLoginKeys(options.blob.url, options.username, keys);
	      store.set('device_id', options.blob.device_id);
	      self.loginStatus = true;
	      $scope.$broadcast('$blobUpdate');
	      store.set('ripple_known', true);  
	      callback();          
	    });
	  };
	  
	  Id.prototype.logout = function ()
	  {
	    store.remove('ripple_auth');

	    //remove deviceID if remember me is not set
	    if (!store.get('remember_me')) {
	      store.remove('device_id');  
	    }
	    
	    // TODO make it better
	    this.account = '';
	    this.keys = {};
	    this.loginStatus = false;
	    this.username = '';

	    $scope.address = '';
	//    $location.path('/login');

	    // problem?
	    // reload will not work, as some pages are also available for guests.
	    // Logout will show the same page instead of showing login page.
	    // This line redirects user to root (login) page
	//    var port = location.port.length > 0 ? ":" + location.port : "";
	//    location.href = location.protocol + '//' + location.hostname  + port + location.pathname;
	  };

	  Id.prototype.unlock = function (username, password, callback)
	  {
	    var self = this;

	    // Callback is optional
	    if ("function" !== typeof callback) callback = $.noop;

	    //username = Id.normalizeUsernameForDisplay(username);
	    //password = Id.normalizePassword(password);

	    $authflow.unlock(username, password, function (err, resp) {
	      if (err) {
	        callback(err);
	        return;
	      }
	    
	      callback(null, resp.secret);
	    });
	  };

	  /**
	   * Go to an identity page.
	   *
	   * Redirects the user to a page where they can identify. This could be the
	   * login or register tab most likely.
	   */
	  Id.prototype.goId = function () {
	    if (!this.isLoggedIn()) {
	      if (_.size($routeParams)) {
	        var tab = $route.current.tabName;
	        $location.search('tab', tab);
	        $location.path('/login');
	        return;
	      }

	      if (this.isReturning()) {
	        $location.path('/login');
	      } else {
	        $location.path('/register');
	      }
	    }
	  };

	  return new Id();
	}]);




/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Event tracker (analytics)
	 */

	var module = angular.module('tracker', []);

	module.factory('rpTracker', ['$rootScope', function ($scope) {
	  var track = function (event,properties) {
	    if (Options.mixpanel && Options.mixpanel.track && window.mixpanel) {
	      try {
	        mixpanel.track(event,properties);
	      } catch (ex) {
	        // This probably means the browser is blocking us
	        // or mixpanel is down
	        console.log('Mixpanel tracking failed', ex);
	      }
	    }
	  };

	  return {
	    track: track
	  };
	}]);


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * BLOB
	 *
	 * User blob storage service
	 */

	// TODO build a blobPrototype.
	// There's currently a code repetition between blobLocal and blobRemote..

	var webutil = __webpack_require__(52);

	var module = angular.module('blob', []);

	module.factory('rpBlob', ['$rootScope', '$http', function ($scope, $http)
	{
	  var BlobObj = function (url, id, key)
	  {
	    this.url = url;
	    this.id = id;
	    this.key = key;
	    this.data = {};
	  };

	  // Blob operations
	  // Do NOT change the mapping of existing ops
	  BlobObj.ops = {
	    // Special
	    "noop": 0,

	    // Simple ops
	    "set": 16,
	    "unset": 17,
	    "extend": 18,

	    // Meta ops
	    "push": 32,
	    "pop": 33,
	    "shift": 34,
	    "unshift": 35,
	    "filter": 36
	  };

	  BlobObj.opsReverseMap = [];
	  $.each(BlobObj.ops, function (name, code) {
	    BlobObj.opsReverseMap[code] = name;
	  });

	  /**
	   * Attempts to retrieve the blob.
	   */
	  BlobObj.get = function(url, id, callback)
	  {
	    if (url.indexOf("://") === -1) url = "http://" + url;

	    $.ajax({
	      url: url + '/v1/blob/' + id,
	      dataType: 'json',
	      timeout: 8000
	    })
	      .success(function (data) {
	        setImmediate(function () {
	          $scope.$apply(function () {
	            if (data.result === "success") {
	              callback(null, data);
	            } else {
	              callback(new Error("Incorrect Ripple name or password."));
	            }
	          });
	        });
	      })
	      .error(webutil.getAjaxErrorHandler(callback, "BlobVault GET"));
	  };

	  /**
	   * Attempts to retrieve and decrypt the blob.
	   */
	  BlobObj.init = function(url, id, crypt, callback)
	  {
	    BlobObj.get(url, id, function (err, data) {
	      if (err) {
	        callback(err);
	        return;
	      }

	      var blob = new BlobObj(url, id, crypt);

	      blob.revision = data.revision;

	      // HOTFIX: Workaround for blobvault sending encrypted_secret in incorrect format
	      if (Array.isArray(data.encrypted_secret)) {
	        data.encrypted_secret = sjcl.codec.utf8String.fromBits(sjcl.codec.bytes.toBits(data.encrypted_secret));
	      }
	      blob.encrypted_secret = data.encrypted_secret;

	      if (!blob.decrypt(data.blob)) {
	        callback(new Error("Error while decrypting blob"));
	      }

	      // Apply patches
	      if ($.isArray(data.patches) && data.patches.length) {
	        var successful = true;
	        $.each(data.patches, function (i, patch) {
	          successful = successful && blob.applyEncryptedPatch(patch);
	        });

	        if (successful) blob.consolidate();
	      }

	      // HOTFIX: Workaround for old staging accounts that have the secret stored in the blob
	      //         This is NOT needed for any production accounts and will be removed in the future.
	      if (blob.encrypted_secret === "" &&
	          "object" === typeof blob.data &&
	          "string" === typeof blob.data.encrypted_secret) {
	        blob.encrypted_secret = blob.data.encrypted_secret;
	      }

	      callback(null, blob);
	    });
	  };

	  /**
	   * Create a blob object
	   *
	   * @param {object} opts
	   * @param {string} opts.url
	   * @param {string} opts.id
	   * @param opts.crypt
	   * @param opts.unlock
	   * @param {string} opts.username
	   * @param {string} opts.account
	   * @param {string} opts.masterkey
	   * @param {object=} opts.oldUserBlob
	   * @param {function} callback
	   */
	  BlobObj.create = function (opts, callback)
	  {
	    var blob = new BlobObj(opts.url, opts.id, opts.crypt);
	    var encryptedSecret = blob.encryptSecret(opts.unlock, opts.masterkey);

	    blob.revision = 0;
	    blob.data = {
	      auth_secret: sjcl.codec.hex.fromBits(sjcl.random.randomWords(8)),
	      account_id: opts.account,
	      email: opts.email,
	      contacts: [],
	      created: (new Date()).toJSON()
	    };
	    blob.encrypted_secret = encryptedSecret;

	    // Migration
	    if (opts.oldUserBlob) {
	      blob.data.contacts = opts.oldUserBlob.data.contacts;
	    }

	    var config = {
	      method: "POST",
	      url: opts.url + '/v1/user',
	      data: {
	        blob_id: opts.id,
	        username: opts.username,
	        address: opts.account,
	        auth_secret: blob.data.auth_secret,
	        data: blob.encrypt(),
	        email: opts.email,
	        hostlink: Options.activate_link,
	        encrypted_blobdecrypt_key: blob.encryptBlobCrypt(opts.masterkey, opts.crypt),
	        encrypted_secret: encryptedSecret
	      }
	    };

	    $http(BlobObj.signRequestAsymmetric(config, opts.masterkey, opts.account, opts.id))
	    .success(function (data) {
	      if (data.result === "success") {
	        callback(null, blob, data);
	      } else {
	        callback(new Error("Could not create blob"));
	      }
	    })
	//    .error(webutil.getAjaxErrorHandler(callback, "BlobVault POST /v1/user"));
	    .error(function(err){
	      console.log('err',err);
	    })
	  };

	  BlobObj.verify = function (opts, callback) {
	    $http({
	      method: 'GET',
	      url: opts.url + '/v1/user/' + opts.username + '/verify/' + opts.token
	    })
	    .success(function(data, status, headers, config) {
	      if (data.result === "success") {
	        callback(null, data);
	      } else {
	        console.log("client: blob: could not verify:", data);
	        callback(new Error("Failed to verify the account"));
	      }
	    })
	    .error(function(data, status, headers, config) {
	      console.log("client: blob: could not verify: "+status+" - "+data);
	      callback(new Error("Failed to verify the account - XHR error"));
	    });
	  };

	  BlobObj.prototype.resendEmail = function (opts, callback) {
	    var config = {
	      method: 'POST',
	      url: opts.url + '/v1/user/email',
	      responseType: 'json',
	      data: {
	        blob_id: this.id,
	        username: opts.username,
	        email: opts.email,
	        hostlink: Options.activate_link
	      }
	    };

	    $http(BlobObj.signRequestAsymmetric(config, opts.masterkey, this.data.account_id, this.id))
	      .success(function(data, status, headers, config) {
	        if (data.result === "success") {
	          callback(null, data);
	        } else {
	          console.log("client: blob: could not resend the token:", data);
	          callback(new Error("Failed to resend the token"));
	        }
	      })
	      .error(function(data, status, headers, config) {
	        console.log("client: blob: could not resend the token:", data);
	        callback(new Error("Failed to resend the token"));
	      });
	  };

	  var cryptConfig = {
	    cipher: "aes",
	    mode: "ccm",
	    // tag length
	    ts: 64,
	    // key size
	    ks: 256,
	    // iterations (key derivation)
	    iter: 1000
	  };

	  function encrypt(key, data)
	  {
	    key = sjcl.codec.hex.toBits(key);

	    var opts = $.extend({}, cryptConfig);

	    var encryptedObj = JSON.parse(sjcl.encrypt(key, data, opts));

	    var version = [sjcl.bitArray.partial(8, 0)];
	    var initVector = sjcl.codec.base64.toBits(encryptedObj.iv);
	    var ciphertext = sjcl.codec.base64.toBits(encryptedObj.ct);

	    var encryptedBits = sjcl.bitArray.concat(version, initVector);
	    encryptedBits = sjcl.bitArray.concat(encryptedBits, ciphertext);

	    return sjcl.codec.base64.fromBits(encryptedBits);
	  }

	  function decrypt(key, data)
	  {
	    key = sjcl.codec.hex.toBits(key);
	    var encryptedBits = sjcl.codec.base64.toBits(data);

	    var version = sjcl.bitArray.extract(encryptedBits, 0, 8);

	    if (version !== 0) {
	      throw new Error("Unsupported encryption version: "+version);
	    }

	    var encrypted = $.extend({}, cryptConfig, {
	      iv: sjcl.codec.base64.fromBits(sjcl.bitArray.bitSlice(encryptedBits, 8, 8+128)),
	      ct: sjcl.codec.base64.fromBits(sjcl.bitArray.bitSlice(encryptedBits, 8+128))
	    });

	    return sjcl.decrypt(key, JSON.stringify(encrypted));
	  }

	  BlobObj.prototype.encrypt = function()
	  {
	    // Filter Angular metadata before encryption
	    if ('object' === typeof this.data &&
	        'object' === typeof this.data.contacts)
	      this.data.contacts = angular.fromJson(angular.toJson(this.data.contacts));

	    var key = sjcl.codec.hex.toBits(this.key);

	    return encrypt(this.key, JSON.stringify(this.data));
	  };

	  BlobObj.prototype.decrypt = function (data)
	  {
	    try {
	      this.data = JSON.parse(decrypt(this.key, data));
	      return this;
	    } catch (e) {
	      console.log("client: blob: decryption failed", e.toString());
	      console.log(e.stack);
	      return false;
	    }
	  };

	  BlobObj.prototype.applyEncryptedPatch = function (patch)
	  {
	    try {
	      var params = JSON.parse(decrypt(this.key, patch));
	      var op = params.shift();
	      var path = params.shift();

	      this.applyUpdate(op, path, params);

	      this.revision++;

	      return true;
	    } catch (err) {
	      console.log("client: blob: failed to apply patch:", err.toString());
	      console.log(err.stack);
	      return false;
	    }
	  };

	  BlobObj.prototype.consolidate = function (callback) {
	    // Callback is optional
	    if ("function" !== typeof callback) callback = $.noop;

	    console.log("client: blob: consolidation at revision", this.revision);
	    var encrypted = this.encrypt();

	    var config = {
	      method: 'POST',
	      url: this.url + '/v1/blob/consolidate',
	      responseType: 'json',
	      data: {
	        blob_id: this.id,
	        data: encrypted,
	        revision: this.revision
	      }
	    };

	    $http(BlobObj.signRequestHmac(config, this.data.auth_secret, this.id))
	      .success(function(data, status, headers, config) {
	        if (data.result === "success") {
	          callback(null, data);
	        } else {
	          console.log("client: blob: could not consolidate:", data);
	          callback(new Error("Failed to consolidate blob"));
	        }
	      })
	      .error(function(data, status, headers, config) {
	        console.log("client: blob: could not consolidate: "+status+" - "+data);

	        // XXX Add better error information to exception
	        callback(new Error("Failed to consolidate blob - XHR error"));
	      });
	  };

	  BlobObj.escapeToken = function (token) {
	    return token.replace(/[~\/]/g, function (key) { return key === "~" ? "~0" : "~1"; });
	  };
	  BlobObj.prototype.escapeToken = BlobObj.escapeToken;

	  var unescapeToken = function(str) {
	    return str.replace(/~./g, function(m) {
	      switch (m) {
	      case "~0":
	        return "~";
	      case "~1":
	        return "/";
	      }
	      throw("Invalid tilde escape: " + m);
	    });
	  };

	  BlobObj.prototype.applyUpdate = function (op, path, params) {
	    // Exchange from numeric op code to string
	    if ("number" === typeof op) {
	      op = BlobObj.opsReverseMap[op];
	    }
	    if ("string" !== typeof op) {
	      throw new Error("Blob update op code must be a number or a valid op id string");
	    }

	    // Separate each step in the "pointer"
	    var pointer = path.split("/");

	    var first = pointer.shift();
	    if (first !== "") {
	      throw new Error("Invalid JSON pointer: "+path);
	    }

	    this._traverse(this.data, pointer, path, op, params);
	  };

	  BlobObj.prototype._traverse = function (context, pointer,
	                                          originalPointer, op, params) {
	    var _this = this;
	    var part = unescapeToken(pointer.shift());

	    if (Array.isArray(context)) {
	      if (part === '-') {
	        part = context.length;
	      } else if (part % 1 !== 0 && part >= 0) {
	        throw new Error("Invalid pointer, array element segments must be " +
	                        "a positive integer, zero or '-'");
	      }
	    } else if ("object" !== typeof context) {
	      return null;
	    } else if (!context.hasOwnProperty(part)) {
	      // Some opcodes create the path as they're going along
	      if (op === "set") {
	        context[part] = {};
	      } else if (op === "unshift") {
	        context[part] = [];
	      } else {
	        return null;
	      }
	    }

	    if (pointer.length !== 0) {
	      return this._traverse(context[part], pointer,
	                            originalPointer, op, params);
	    }

	    switch (op) {
	    case "set":
	      context[part] = params[0];
	      break;
	    case "unset":
	      if (Array.isArray(context)) {
	        context.splice(part, 1);
	      } else {
	        delete context[part];
	      }
	      break;
	    case "extend":
	      if ("object" !== typeof context[part]) {
	        throw new Error("Tried to extend a non-object");
	      }
	      $.extend(context[part], params[0]);
	      break;
	    case "unshift":
	      if ("undefined" === typeof context[part]) {
	        context[part] = [];
	      } else if (!Array.isArray(context[part])) {
	        throw new Error("Operator 'unshift' must be applied to an array.");
	      }
	      context[part].unshift(params[0]);
	      break;
	    case "filter":
	      if (Array.isArray(context[part])) {
	        context[part].forEach(function (element, i) {
	          if ("object" === typeof element &&
	              element.hasOwnProperty(params[0]) &&
	              element[params[0]] === params[1]) {
	            var subpointer = originalPointer+"/"+i;
	            var subcommands = normalizeSubcommands(params.slice(2));

	            subcommands.forEach(function (subcommand) {
	              var op = subcommand[0];
	              var pointer = subpointer+subcommand[1];
	              _this.applyUpdate(op, pointer, subcommand.slice(2));
	            });
	          }
	        });
	      }
	      break;
	    default:
	      throw new Error("Unsupported op "+op);
	    }
	  };

	  function copyObjectWithSortedKeys(object) {
	    if (jQuery.isPlainObject(object)) {
	      var newObj = {};
	      var keysSorted = Object.keys(object).sort();
	      var key;
	      for (var i in keysSorted) {
	        key = keysSorted[i];
	        if (Object.prototype.hasOwnProperty.call(object, key)) {
	          newObj[key] = copyObjectWithSortedKeys(object[key]);
	        }
	      }
	      return newObj;
	    } else if (jQuery.isArray(object)) {
	      return object.map(copyObjectWithSortedKeys);
	    } else {
	      return object;
	    }
	  }

	  var dateAsIso8601 = (function () {
	    function pad(n) {
	      return (n < 0 || n > 9 ? "" : "0") + n;
	    }

	    return function dateAsIso8601() {
	      var date = new Date();
	      return date.getUTCFullYear() + "-"
	        + pad(date.getUTCMonth() + 1) + "-"
	        + pad(date.getUTCDate()) + "T"
	        + pad(date.getUTCHours()) + ":"
	        + pad(date.getUTCMinutes()) + ":"
	        + pad(date.getUTCSeconds()) + ".000Z";
	    };
	  })();

	  BlobObj.getStringToSign = function (config, parser, date, mechanism) {
	    // XXX This method doesn't handle signing GET requests correctly. The data
	    //     field will be merged into the search string, not the request body.

	    // Sort the properties of the JSON object into canonical form
	    var canonicalData = JSON.stringify(copyObjectWithSortedKeys(config.data));

	    // We're using URL parsing using browser functionality. Unfortunately the
	    // parsing result slightly differs in IE - it is missing a leading slash.
	    // XXX Proper fix would be to use a pure JS URL parser.
	    var pathname = parser.pathname;

	    // IE11 Workaround
	    if (pathname[0] !== '/') pathname = '/' + pathname;

	    // Canonical request using Amazon's v4 signature format
	    // See: http://docs.aws.amazon.com/general/latest/gr/sigv4-create-canonical-request.html
	    var canonicalRequest = [
	      config.method || 'GET',
	      pathname || '',
	      parser.search || '',
	      // XXX Headers signing not supported
	      '',
	      '',
	      sjcl.codec.hex.fromBits(sjcl.hash.sha512.hash(canonicalData)).toLowerCase()
	    ].join('\n');

	    // String to sign inspired by Amazon's v4 signature format
	    // See: http://docs.aws.amazon.com/general/latest/gr/sigv4-create-string-to-sign.html
	    //
	    // We don't have a credential scope, so we skip it.
	    //
	    // But that modifies the format, so the format ID is RIPPLE1, instead of AWS4.
	    return stringToSign = [
	      mechanism,
	      date,
	      sjcl.codec.hex.fromBits(sjcl.hash.sha512.hash(canonicalRequest)).toLowerCase()
	    ].join('\n');
	  }

	  BlobObj.signRequestHmac = function (config, auth_secret, blob_id) {
	    config = $.extend({}, config);

	    // Parse URL
	    var parser = document.createElement('a');
	    parser.href = config.url;

	    var date = dateAsIso8601();
	    var signatureType = 'RIPPLE1-HMAC-SHA512';

	    var stringToSign = BlobObj.getStringToSign(config, parser, date, signatureType);

	    var hmac = new sjcl.misc.hmac(sjcl.codec.hex.toBits(auth_secret), sjcl.hash.sha512);
	    var signature = sjcl.codec.hex.fromBits(hmac.mac(stringToSign));

	    config.url += (parser.search ? "&" : "?") +
	      'signature='+signature+
	      '&signature_date='+date+
	      '&signature_blob_id='+blob_id+
	      '&signature_type='+signatureType

	    return config;
	  };

	  BlobObj.signRequestAsymmetric = function (config, secretKey, account, blob_id) {
	    config = $.extend({}, config);

	    // Parse URL
	    var parser = document.createElement('a');
	    parser.href = config.url;

	    var date = dateAsIso8601();
	    var signatureType = 'RIPPLE1-ECDSA-SHA512';

	    var stringToSign = BlobObj.getStringToSign(config, parser, date, signatureType);

	    var signature = ripple.Message.signMessage(stringToSign, secretKey);
	    
	    config.url += (parser.search ? "&" : "?") +
	      'signature='+webutil.base64ToBase64Url(signature)+
	      '&signature_date='+date+
	      '&signature_blob_id='+blob_id+
	      '&signature_account='+account+
	      '&signature_type='+signatureType;

	    return config;
	  };

	  BlobObj.prototype.postUpdate = function (op, pointer, params, callback) {
	    // Callback is optional
	    if ("function" !== typeof callback) callback = $.noop;

	    if ("string" === typeof op) {
	      op = BlobObj.ops[op];
	    }
	    if ("number" !== typeof op) {
	      throw new Error("Blob update op code must be a number or a valid op id string");
	    }
	    if (op < 0 || op > 255) {
	      throw new Error("Blob update op code out of bounds");
	    }

	    console.log("client: blob: submitting update", BlobObj.opsReverseMap[op], pointer, params);

	    params.unshift(pointer);
	    params.unshift(op);

	    var config = {
	      method: 'POST',
	      url: this.url + '/v1/blob/patch',
	      responseType: 'json',
	      data: {
	        blob_id: this.id,
	        patch: encrypt(this.key, JSON.stringify(params))
	      }
	    };

	    $http(BlobObj.signRequestHmac(config, this.data.auth_secret, this.id))
	      .success(function(data, status, headers, config) {
	        if (data.result === "success") {
	          console.log("client: blob: saved patch as revision", data.revision);
	          callback(null, data);
	        } else {
	          console.log("client: blob: could not save patch:", data);
	          callback(new Error("Patch could not be saved - bad result"));
	        }
	      })
	      .error(function(data, status, headers, config) {
	        console.log("client: blob: could not save patch: "+status+" - "+data);
	        callback(new Error("Patch could not be saved - XHR error"));
	      });
	  };

	  BlobObj.prototype.set = function (pointer, value, callback) {
	    this.applyUpdate('set', pointer, [value]);
	    this.postUpdate('set', pointer, [value], callback);
	  };

	  BlobObj.prototype.unset = function (pointer, callback) {
	    this.applyUpdate('unset', pointer, []);
	    this.postUpdate('unset', pointer, [], callback);
	  };

	  BlobObj.prototype.extend = function (pointer, value, callback) {
	    this.applyUpdate('extend', pointer, [value]);
	    this.postUpdate('extend', pointer, [value], callback);
	  };

	  /**
	   * Prepend an entry to an array.
	   *
	   * This method adds an entry to the beginning of an array.
	   */
	  BlobObj.prototype.unshift = function (pointer, value, callback) {
	    this.applyUpdate('unshift', pointer, [value]);
	    this.postUpdate('unshift', pointer, [value], callback);
	  };

	  function normalizeSubcommands(subcommands, compress) {
	    // Normalize parameter structure
	    if ("number" === typeof subcommands[0] ||
	        "string" === typeof subcommands[0]) {
	      // Case 1: Single subcommand inline
	      subcommands = [subcommands];
	    } else if (subcommands.length === 1 &&
	               Array.isArray(subcommands[0]) &&
	               ("number" === typeof subcommands[0][0] ||
	                "string" === typeof subcommands[0][0])) {
	      // Case 2: Single subcommand as array
	      // (nothing to do)
	    } else if (Array.isArray(subcommands[0])) {
	      // Case 3: Multiple subcommands as array of arrays
	      subcommands = subcommands[0];
	    }

	    // Normalize op name and convert strings to numeric codes
	    subcommands = subcommands.map(function (subcommand) {
	      if ("string" === typeof subcommand[0]) {
	        subcommand[0] = BlobObj.ops[subcommand[0]];
	      }
	      if ("number" !== typeof subcommand[0]) {
	        throw new Error("Invalid op in subcommand");
	      }
	      if ("string" !== typeof subcommand[1]) {
	        throw new Error("Invalid path in subcommand");
	      }
	      return subcommand;
	    });

	    if (compress) {
	      // Convert to the minimal possible format
	      if (subcommands.length === 1) {
	        return subcommands[0];
	      } else {
	        return [subcommands];
	      }
	    } else {
	      return subcommands;
	    }
	  }

	  /**
	   * Filter the row(s) from an array.
	   *
	   * This method will find any entries from the array stored under `pointer` and
	   * apply the `subcommands` to each of them.
	   *
	   * The subcommands can be any commands with the pointer parameter left out.
	   */
	  BlobObj.prototype.filter = function (pointer, field, value, subcommands, callback) {
	    var params = Array.prototype.slice.apply(arguments);
	    if ("function" === typeof params[params.length-1]) {
	      callback = params.pop();
	    }
	    params.shift();

	    // Normalize subcommands to minimize the patch size
	    params = params.slice(0, 2).concat(normalizeSubcommands(params.slice(2), true));

	    this.applyUpdate('filter', pointer, params);
	    this.postUpdate('filter', pointer, params, callback);
	  };

	  BlobObj.prototype.decryptSecret = function (secretUnlockKey) {
	    return decrypt(secretUnlockKey, this.encrypted_secret);
	  };

	  BlobObj.prototype.encryptSecret = function (secretUnlockKey, secret) {
	    return encrypt(secretUnlockKey, secret);
	  };

	  function deriveRecoveryEncryptionKeyFromSecret(secret) {
	    var seed = ripple.Seed.from_json(secret).to_bits();
	    var hmac = new sjcl.misc.hmac(seed, sjcl.hash.sha512);
	    var key = hmac.mac("ripple/hmac/recovery_encryption_key/v1");
	    key = sjcl.bitArray.bitSlice(key, 0, 256);
	    return sjcl.codec.hex.fromBits(key);
	  }

	  BlobObj.prototype.decryptBlobCrypt = function (secret) {
	    var recoveryEncryptionKey = deriveRecoveryEncryptionKeyFromSecret(secret);
	    return decrypt(recoveryEncryptionKey, this.encrypted_blobdecrypt_key);
	  };

	  BlobObj.prototype.encryptBlobCrypt = function (secret, blobDecryptKey) {
	    var recoveryEncryptionKey = deriveRecoveryEncryptionKeyFromSecret(secret);
	    return encrypt(recoveryEncryptionKey, blobDecryptKey);
	  };

	  function BlobError(message, backend) {
	    this.name = "BlobError";
	    this.message = message || "";
	    this.backend = backend || "generic";
	  }

	  BlobError.prototype = Error.prototype;

	  BlobObj.BlobError = BlobError;

	  return BlobObj;
	}]);


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * OLD BLOB
	 *
	 * The old blob service that used to manage the user's private information.
	 */

	var webutil = __webpack_require__(52),
	    log = __webpack_require__(53);

	var module = angular.module('oldblob', []);

	module.factory('rpOldBlob', ['$rootScope', function ($scope)
	{
	  var BlobObj = function ()
	  {
	    this.data = {};
	    this.meta = {};
	  };

	  function processBackendsParam(backends)
	  {
	    if (!Array.isArray(backends)) {
	      backends = [backends];
	    }

	    backends = backends.map(function (backend) {
	      if ("string" === typeof backend) {
	        return BlobObj.backends[backend];
	      } else {
	        return backend;
	      }
	    });

	    return backends;
	  }

	  /**
	   * Attempts to retrieve the blob from the specified backend.
	   */
	  BlobObj.get = function(backends, user, pass, callback)
	  {
	    backends = processBackendsParam(backends);

	    var backend = backends.shift();

	    var key = sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(user + pass));
	    try {
	      backend.get(key, function (err, data) {
	        $scope.$apply(function () {
	          if (err) {
	            handleError(err, backend);
	            return;
	          }

	          if (data) {
	            callback(null, data);
	          } else {
	            handleError('Wallet not found (Username / Password is wrong)', backend);
	          }
	        });
	      });
	    } catch (err) {
	      handleError(err, backend);
	    }

	    function handleError(err, backend) {
	      console.warn("Backend failed:", backend.name, err.toString());
	      if ("string" === typeof err) {
	        err = new BlobError(err, backend.name);
	      } else if (!(err instanceof BlobError)) {
	        err = new BlobError(err.message, backend.name);
	      }
	      $scope.$broadcast('$blobError', err);
	      tryNext(err);
	    }

	    function tryNext(err) {
	      // Do we have more backends to try?
	      if (backends.length) {
	        BlobObj.get(backends, user, pass, callback);
	      } else {
	        callback(err);
	      }
	    }
	  };

	  BlobObj.enc = function(username,password,bl)
	  {
	    // filter out contacts before they are encrypted
	    if (typeof(bl.data.contacts) === 'object')
	      bl.data.contacts = angular.fromJson(angular.toJson(bl.data.contacts));

	    var key = ""+username.length+'|'+username+password;
	    return btoa(sjcl.encrypt(key, JSON.stringify(bl.data), {
	      iter: 1000,
	      adata: JSON.stringify(bl.meta),
	      ks: 256
	    }));
	  };

	  BlobObj.set = function(backends, username, password, bl, callback)
	  {
	    // Callback is optional
	    if ("function" !== typeof callback) callback = $.noop;

	    backends = processBackendsParam(backends);

	    var hash = sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(username + password));
	    var encData = BlobObj.enc(username, password, bl);

	    backends.forEach(function (backend) {
	      backend.set(hash, encData, callback);
	    });
	  };

	  BlobObj.remove = function(backends, username, password, callback)
	  {
	    // Callback is optional
	    if ("function" !== typeof callback) callback = $.noop;

	    backends = processBackendsParam(backends);

	    var hash = sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(username + password));

	    backends.forEach(function (backend) {
	      backend.set(hash, '.', callback);
	    });
	  };

	  BlobObj.decrypt = function (user, pass, data)
	  {
	    function decrypt(priv, ciphertext)
	    {
	      var blob = new BlobObj();
	      blob.data = JSON.parse(sjcl.decrypt(priv, ciphertext));
	      // TODO unescape is deprecated
	      blob.meta = JSON.parse(unescape(JSON.parse(ciphertext).adata));
	      return blob;
	    }

	    var key;
	    try {
	      // Try new-style key
	      key = ""+user.length+'|'+user+pass;
	      return decrypt(key, atob(data));
	    } catch (e1) {
	      console.log("Blob decryption failed with new-style key:", e1.toString());
	      try {
	        // Try old style key
	        key = user+pass;
	        var blob = decrypt(key, atob(data));
	        blob.old = true;
	        return blob;
	      } catch (e2) {
	        console.log("Blob decryption failed with old-style key:", e2.toString());
	        return false;
	      }
	    }
	  };

	  var VaultBlobBackend = {
	    name: "Payward",

	    get: function (key, callback) {
	      var url = Options.blobvault;

	      if (url.indexOf("://") === -1) url = "http://" + url;

	      $.ajax({
	        url: url + '/' + key,
	        timeout: 8000
	      })
	        .success(function (data) {
	          callback(null, data);
	        })
	        .error(webutil.getAjaxErrorHandler(callback, "BlobVault GET"));
	    },

	    set: function (key, value, callback) {
	      var url = Options.blobvault;

	      if (url.indexOf("://") === -1) url = "http://" + url;

	      $.post(url + '/' + key, { blob: value })
	        .success(function (data) {
	          callback(null, data);
	        })
	        .error(webutil.getAjaxErrorHandler(callback, "BlobVault SET"));
	    }
	  };

	  var LocalBlobBackend = {
	    name: "Local browser",

	    get: function (key, callback)
	    {
	      console.log('local get','ripple_blob_' + key);
	      var blob = store.get('ripple_blob_'+key);
	      // We use a timeout to simulate this function being asynchronous
	      callback(null, blob);
	    },

	    set: function (key, value, callback)
	    {
	      if (!store.disabled) {
	        store.set('ripple_blob_'+key, value);
	      }
	      callback();
	    }
	  };

	  BlobObj.backends = {
	    vault: VaultBlobBackend,
	    local: LocalBlobBackend
	  };

	  function BlobError(message, backend) {
	    this.name = "BlobError";
	    this.message = message || "";
	    this.backend = backend || "generic";
	  }

	  BlobError.prototype = Error.prototype;

	  BlobObj.BlobError = BlobError;

	  return BlobObj;
	}]);


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Transaction Queue
	 *
	 * This is the Transaction Queue service
	 */

	var module = angular.module('txQueue', []);

	module.service('rpTxQueue', ['$rootScope', 'rpNetwork', 'rpKeychain', 'rpId',
	  function($scope, network, keychain, id)
	{
	  return {
	    /**
	     * Add (or execute immediately if account is funded) transaction to the txQueue.
	     * This method will set the secret, sequence number and sign it.
	     *
	     * @param tx object
	     */
	    addTransaction: function(tx) {
	      // Get user's secret key
	      keychain.requestSecret(id.account, id.username, function (err, secret) {
	        if (err) {
	          console.log("client: trust profile: error while " +
	            "unlocking wallet: ", err);
	          $scope.mode = "error";
	          $scope.error_type = "unlockFailed";
	          return;
	        }

	        // TODO assigning a sequence number should check sequence numbers in queue
	        tx.tx_json.Sequence = $scope.account.Sequence || 1;
	        tx.secret(secret);
	        tx.complete();
	        tx.sign();

	        // Transaction blob
	        var blob = tx.serialize().to_hex();

	        // If account is funded submit the transaction right away
	        if ($scope.account.Balance) {
	          network.remote.requestSubmit()
	            .txBlob(blob)
	            .request();
	        }

	        // If not, add it to the queue.
	        // (Will be submitted as soon as account gets funding)
	        else {
	          var item = {
	            blob: blob,
	            type: tx.tx_json.TransactionType
	          };

	          // Additional details depending on a transaction type
	          if ('TrustSet' === item.type) {
	            item.details = tx.tx_json.LimitAmount;
	          }

	          $scope.userBlob.unshift("/txQueue", item);
	        }
	      });
	    },

	    /**
	     * Check if the account has been funded.
	     * If yes, submit all the transactions in the queue.
	     */
	    checkQueue: function() {
	      if (!$scope.account.Balance || !$scope.userBlob.data.txQueue) return;

	      $scope.userBlob.data.txQueue.forEach(function(tx){
	        network.remote.requestSubmit()
	               .txBlob(tx.blob)
	               .request();
	      });

	      this.emptyQueue();
	    },

	    /**
	     * Empty transaction queue
	     */
	    emptyQueue: function() {
	      $scope.userBlob.unset('/txQueue');
	    }
	  };
	}]);

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * AUTH FLOW
	 *
	 * The auth flow service manages the login, unlock and registration procedures.
	 */

	var webutil     = __webpack_require__(52);
	var log         = __webpack_require__(53);

	var module = angular.module('authflow', []);

	module.factory('rpAuthFlow', ['$rootScope',
	                              function ($scope)
	{
	  var AuthFlow = {};

	  AuthFlow.exists = function (username, password, callback) {
	    var meta = AuthFlow.getVaultClient(username);
	    meta.client.exists(meta.username, callback);
	  };

	  AuthFlow.login = function (opts, callback) {
	    var meta     = AuthFlow.getVaultClient(opts.username);
	    var deviceID = opts.device_id || meta.client.generateDeviceID(); 
	    meta.client.login(meta.username, opts.password, deviceID, function(err, resp) {
	      if (err) {
	        $scope.$apply(function(){
	          callback(err);
	        });
	        
	        return;
	      }

	      var keys = {
	        id    : resp.blob.id,
	        crypt : resp.blob.key
	      }
	              
	      console.log("client: authflow: login succeeded", resp.blob);
	      $scope.$apply(function(){
	        callback(null, resp.blob, keys, resp.username, resp.verified);    
	      });
	    });
	  };

	  /**
	   * Register an account
	   *
	   * @param {object} opts
	   * @param {string} opts.username
	   * @param {string} opts.password
	   * @param {string} opts.account
	   * @param {string} opts.masterkey
	   * @param {object} opts.oldUserBlob
	   * @param {function} callback
	   */
	  AuthFlow.register = function (opts, callback) {
	    opts.activateLink = Options.activate_link; //add the email activation link
	    opts.domain = Options.domain;

	    var meta = AuthFlow.getVaultClient(opts.username);
	    opts.username = meta.username;

	    meta.client.register(opts, function(err, resp) {
	      if (err) {
	        $scope.$apply(function(){
	          callback(err);
	        });
	        return;
	      }
	         
	      var keys = {
	        id    : resp.blob.id,
	        crypt : resp.blob.key
	      }
	              
	      console.log("client: authflow: registration succeeded", resp.blob);
	      $scope.$apply(function(){
	        callback(null, resp.blob, keys, resp.username);      
	      });    
	    });
	  };

	  AuthFlow.verify = function (opts, callback) {
	    var meta = AuthFlow.getVaultClient(opts.username);
	    meta.client.verify(meta.username, opts.token, function(err, resp){
	      $scope.$apply(function(){
	        callback(err, resp);      
	      });     
	    });
	  };

	  AuthFlow.resendEmail = function (opts, callback) {
	    opts.activateLink = Options.activate_link;
	    var meta = AuthFlow.getVaultClient(opts.username);
	    opts.username = meta.username;
	    meta.client.resendEmail(opts, function(err, resp){
	      $scope.$apply(function(){
	        callback(err, resp);
	      });  
	    });
	  };

	  AuthFlow.rename = function (opts, callback) {
	    var meta = AuthFlow.getVaultClient(opts.username);
	    meta.client.rename(opts, function(err, resp){
	      $scope.$apply(function(){
	        callback(err, resp);
	      });
	    });
	  };

	  AuthFlow.relogin = function (url, keys, deviceID, callback) {
	    var meta = AuthFlow.getVaultClient('');
	    if (!deviceID) deviceID = meta.client.generateDeviceID(); 
	    meta.client.relogin(url, keys.id, keys.crypt, deviceID, function(err, resp){
	        if (err) {
	          callback(err);
	          return;
	        }
	        
	       callback(null, resp.blob);      
	    });
	  };

	  AuthFlow.unlock = function (username, password, callback) {
	    if (!$scope.userBlob) {
	      $scope.$apply(function(){ 
	        callback(new Error("Blob not found"));         
	      });
	      return;       
	    }
	    
	    var meta = AuthFlow.getVaultClient(username);
	    var encrypted_secret = $scope.userBlob.encrypted_secret;
	    meta.client.unlock(meta.username, password, encrypted_secret, function (err, resp){
	      setImmediate(function(){
	        $scope.$apply(function(){ 
	          callback(err, resp);         
	        });     
	      });    
	    });        
	  };
	  
	  AuthFlow.recoverBlob = function (username, masterkey, callback) {
	    var meta = AuthFlow.getVaultClient(username);
	    
	    meta.client.getAuthInfo(username, function(err, authInfo){
	      if (err) {
	        $scope.$apply(function(){ 
	          callback(err);         
	        });      
	      
	      } else if (!authInfo.exists) {
	        $scope.$apply(function(){ 
	          callback(new Error ("User does not exist."));         
	        });  
	             
	      } else {
	        var options = {
	          url       : authInfo.blobvault,
	          username  : authInfo.username, //must use actual username
	          masterkey : masterkey
	        }
	        meta.client.recoverBlob(options, function (err, resp){
	          setImmediate(function(){
	            $scope.$apply(function(){ 
	            
	              //need the actual username for the change password call
	              if (resp) {
	                resp.username = authInfo.username;
	              }
	              
	              callback(err, resp);     
	            });    
	          }); 
	        });
	      }
	      
	    });
	  };
	  
	  AuthFlow.changePassword = function (options, callback) {
	    var meta = AuthFlow.getVaultClient(options.username);
	    
	    meta.client.changePassword(options, function(err, resp){
	      $scope.$apply(function(){ 
	        callback(err, resp);         
	      });      
	    });
	  };
	  
	  AuthFlow.requestToken = function (url, id, force_sms, callback) {
	    var meta = AuthFlow.getVaultClient('');
	    meta.client.requestToken(url, id, force_sms, function(err, resp){
	      $scope.$apply(function() { 
	        callback(err, resp);         
	      });       
	    });  
	  }

	  AuthFlow.verifyToken = function (options, callback) {
	    var meta = AuthFlow.getVaultClient('');
	    if (!options.device_id) {
	      options.device_id = meta.client.generateDeviceID(); 
	    }

	    meta.client.verifyToken(options, function(err, resp){
	      $scope.$apply(function() { 
	        callback(err, resp);         
	      });       
	    });  
	  }
	  
	  AuthFlow.getVaultClient = function(username) {
	    var meta = { username: username, domain: Options.domain };

	    var atSign = username.indexOf('@');
	    if (atSign !== -1) {
	      meta = {
	        username: username.substring(0, atSign),
	        domain: username.substring(atSign+1)
	      };
	    }

	    meta.client = new ripple.VaultClient(meta.domain);

	    return meta;
	  }

	  return AuthFlow;
	}]);


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * AUTH INFO
	 *
	 * The auth info service is responsible for downloading the authentication
	 * metadata.
	 *
	 * The authentication metadata contains information about the authentication
	 * procedure the user needs to go through in order to decrypt their blob
	 * successfully.
	 */

	var webutil = __webpack_require__(52),
	    log = __webpack_require__(53);

	var module = angular.module('authinfo', []);

	module.factory('rpAuthInfo', ['$rootScope', 'rpRippleTxt', '$http',
	  function ($scope, $txt, $http)
	{
	  var AuthInfo = {};

	  AuthInfo.get = function (domain, username, callback) {
	    var txtPromise = $txt.get(domain);

	    if (txtPromise) {
	      if ("function" === typeof txtPromise.then) {
	        txtPromise.then(processTxt, handleNoTxt);
	      } else {
	        processTxt(txtPromise);
	      }
	    } else {
	      handleNoTxt();
	    }

	    function handleNoTxt() {
	      callback(new Error("Unable to load ripple.txt of authentication provider"));
	    }

	    function processTxt(txt) {
	      if (txt.authinfo_url) {
	        $.ajax({
	          url: txt.authinfo_url,
	          dataType: "json",
	          data: {
	            domain: domain,
	            username: username
	          },
	          error: function () {
	            $scope.$apply(function() {
	              callback(new Error("Cannot connect to our login system, please try again later or contact support@ripple.com."));
	            });
	          },
	          success: function (data) {
	            $scope.$apply(function() {
	              callback(null, data);
	            });
	          }
	        });
	      } else {
	        callback(new Error("Authentication is not supported on "+domain));
	      }
	    }
	  };

	  AuthInfo.getByRippleAddress = function (domain, rippleAddress, callback) {
	    $http({
	      method: 'GET',
	      url: 'http://' + domain + ':8081/v1/user/' + rippleAddress
	    })
	    .success(function(data, status, headers, config) {
	      callback(null, data);
	    })
	    .error(function(data, status, headers, config) {
	      callback(new Error("Failed to get the account - XHR error"));
	    });
	  };

	  return AuthInfo;
	}]);


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * KEY DERIVATION FUNCTION
	 *
	 * This service takes care of the key derivation, i.e. converting low-entropy
	 * secret into higher entropy secret via either computationally expensive
	 * processes or peer-assisted key derivation (PAKDF).
	 */

	var webutil = __webpack_require__(52),
	    log = __webpack_require__(53);

	var module = angular.module('kdf', []);

	// Full domain hash based on SHA512
	function fdh(data, bytelen)
	{
	  var bitlen = bytelen << 3;

	  if (typeof data === "string") {
	    data = sjcl.codec.utf8String.toBits(data);
	  }

	  // Add hashing rounds until we exceed desired length in bits
	  var counter = 0, output = [];
	  while (sjcl.bitArray.bitLength(output) < bitlen) {
	    var hash = sjcl.hash.sha512.hash(sjcl.bitArray.concat([counter], data));
	    output = sjcl.bitArray.concat(output, hash);
	    counter++;
	  }

	  // Truncate to desired length
	  output = sjcl.bitArray.clamp(output, bitlen);

	  return output;
	}

	module.factory('rpKdf', ['$http', function ($http)
	{
	  var Kdf = {};

	  Kdf.deriveRemotely = function (opts, username, purpose, secret, callback)
	  {
	    var iExponent = new sjcl.bn(String(opts.exponent)),
	        iModulus = new sjcl.bn(String(opts.modulus)),
	        iAlpha = new sjcl.bn(String(opts.alpha));

	    var publicInfo = "PAKDF_1_0_0:"+opts.host.length+":"+opts.host+
	          ":"+username.length+":"+username+
	          ":"+purpose.length+":"+purpose+
	          ":",
	        publicSize = Math.ceil(Math.min((7+iModulus.bitLength()) >>> 3, 256)/8),
	        publicHash = fdh(publicInfo, publicSize),
	        publicHex  = sjcl.codec.hex.fromBits(publicHash),
	        iPublic    = new sjcl.bn(String(publicHex)).setBitM(0),
	        secretInfo = publicInfo+":"+secret.length+":"+secret+":",
	        secretSize = (7+iModulus.bitLength()) >>> 3,
	        secretHash = fdh(secretInfo, secretSize),
	        secretHex  = sjcl.codec.hex.fromBits(secretHash),
	        iSecret    = new sjcl.bn(String(secretHex)).mod(iModulus);

	    if (iSecret.jacobi(iModulus) !== 1) {
	      iSecret = iSecret.mul(iAlpha).mod(iModulus);
	    }

	    var iRandom;
	    for (;;) {
	      iRandom = sjcl.bn.random(iModulus, 0);
	      if (iRandom.jacobi(iModulus) === 1)
	        break;
	    }

	    var iBlind = iRandom.powermodMontgomery(iPublic.mul(iExponent), iModulus),
	        iSignreq = iSecret.mulmod(iBlind, iModulus),
	        signreq = sjcl.codec.hex.fromBits(iSignreq.toBits());

	    $http({
	      method: "POST",
	      url: opts.url,
	      data: {
	        info: publicInfo,
	        signreq: signreq
	      },
	      responseType: 'json'
	    })
	      .success(function (data) {
	        if (data.result === "success") {
	          var iSignres = new sjcl.bn(String(data.signres));
	          var iRandomInv = iRandom.inverseMod(iModulus);
	          var iSigned = iSignres.mulmod(iRandomInv, iModulus);

	          callback(null, iSigned.toBits());
	        } else {
	          // XXX Handle error
	        }
	      })
	      .error(function () {
	        callback(new Error("Could not query PAKDF server "+opts.host));
	      });
	  };

	  return Kdf;
	}]);


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * KEYCHAIN
	 *
	 * Manages the actual signing keys for the account.
	 *
	 * The account is locked by default. When a transaction is requested, the user
	 * can enter their password to unlock their account for a certain period of
	 * time. This class manages the timeout when the account will be re-locked.
	 */

	var webutil = __webpack_require__(52),
	    log = __webpack_require__(53);

	var module = angular.module('keychain', ['popup']);

	module.factory('rpKeychain', ['$rootScope', '$timeout', 'rpPopup', 'rpId',
	                              function ($scope, $timeout, popup, id)
	{
	  var Keychain = function ()
	  {
	    var _this = this;
	    this.secrets = {};

	    // Unlock the Desktop client right away
	    if ('desktop' === $scope.client) {
	      var keychain = this;
	      var watcher = $scope.$watch('userBlob', function(){
	        if ($scope.userBlob.data && $scope.userBlob.data.account_id) {
	          keychain.secrets[$scope.userBlob.data.account_id] = {
	            masterkey: $scope.userBlob.data.masterkey
	          };
	          watcher();
	        }
	      }, true);
	    }
	  };

	  // Default unlock duration is 5 minutes
	  Keychain.unlockDuration = 5 * 60 * 1000;

	  Keychain.prototype.isUnlocked = function (account) {
	    return !!this.secrets[account];
	  };

	  /**
	   * Getting a secret for an account with default UI.
	   *
	   * This function will immediatly callback if the wallet is already unlocked.
	   * Otherwise, it will automatically handle the unlock process using a modal
	   * popover.
	   *
	   * If the user cancels the operation, the method will call the callback with
	   * an error.
	   */
	  Keychain.prototype.requestSecret = function (account, username, purpose, callback) {
	    var _this = this;

	    if ("function" === typeof purpose) {
	      callback = purpose;
	      purpose = null;
	    }

	    // Handle already unlocked accounts
	    if (this.secrets[account]) {
	      // Keep the secret in a closure in case it happens to get locked
	      // between now and when $timeout calls back.
	      var secret = this.secrets[account].masterkey;
	      $timeout(function () {
	        callback(null, secret);
	      });
	      return;
	    }

	    var popupScope = $scope.$new();
	    var unlock = popupScope.unlock = {
	      isConfirming: false,
	      password: '',
	      purpose: purpose
	    };
	    popupScope.confirm = function () {
	      unlock.isConfirming = true;

	      function handleSecret(err, secret) {
	        if (err) {
	          // XXX More fine-grained error handling would be good. Can we detect
	          //     server down?
	          unlock.isConfirming = false;
	          unlock.error = "password";
	        } else {
	          popup.close();

	          callback(null, secret);
	        }
	      }

	      _this.getSecret(account, username, popupScope.unlock.password,
	                      handleSecret);
	    };
	    popupScope.cancel = function () {
	      callback("canceled"); //need this for setting password protection
	      popup.close();
	    };
	    popup.blank(__webpack_require__(62)(), popupScope);
	  };

	  /**
	   * Getting a secret for an account with custom UI.
	   *
	   * The difference between this method and Keychain#requestSecret is that to
	   * call this function you have to request the password from the user yourself.
	   */
	  Keychain.prototype.getSecret = function (account, username, password, callback) {
	    var _this = this;

	    // Handle already unlocked accounts
	    if (this.secrets[account] && this.secrets[account].password === password) {
	      // Keep the secret in a closure in case it happens to get locked
	      // between now and when $timeout calls back.
	      var secret = this.secrets[account].masterkey;
	      $timeout(function () {
	        callback(null, secret);
	      });
	      return;
	    }

	    id.unlock(username, password, function (err, secret) {
	      if (err) {
	        callback(err);
	        return;
	      }

	      // Cache secret for unlock period
	      _this.secrets[account] = {
	        masterkey: secret,
	        password: password
	      };

	      _this.expireSecret(account);
	      callback(null, secret);
	    });
	  };

	  /**
	   * Synchronous way to acquire secret.
	   *
	   * This function will only work if the account is already unlocked. Throws an
	   * error otherwise.
	   */
	  Keychain.prototype.getUnlockedSecret = function (account) {
	    if (!this.isUnlocked) {
	      throw new Error("Keychain: Tried to get secret for locked account synchronously.");
	    }

	    return this.secrets[account].masterkey;
	  };


	 /**
	  * setPasswordProtection
	  * @param {Object} protect
	  * @param {Object} callback
	  */
	  Keychain.prototype.setPasswordProtection = function (requirePassword, callback) {
	    var _this   = this;

	    if (requirePassword === false) {
	      this.requestSecret(id.account, id.username, function(err, secret) {
	        if (err) {
	          return callback(err);            
	        }
	        
	        setPasswordProtection(requirePassword, secret, callback);
	      });
	                       
	    } else {
	      setPasswordProtection(requirePassword, null, callback);
	    }
	    
	    function setPasswordProtection (requirePassword, secret, callback) {
	      
	      $scope.userBlob.set('/persistUnlock', !requirePassword, function(err, resp) {
	        if (err) {
	          return callback(err);
	        }
	        
	        if (requirePassword) {
	          _this.expireSecret(id.account);
	        }
	        
	      });
	    }
	  };
	  
	  Keychain.prototype.expireSecret = function (account) {
	    var _this = this;
	    $timeout(function(){
	      if (_this.secrets[account] && !$scope.userBlob.data.persistUnlock) {
	        delete _this.secrets[account];  
	      }  
	    }, Keychain.unlockDuration);  
	  }
	  
	  return new Keychain();
	}]);


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * NETWORK
	 *
	 * The network service is used to communicate with the Ripple network.
	 *
	 * It encapsulates a ripple.Remote instance.
	 */

	var module = angular.module('network', []);

	module.factory('rpNetwork', ['$rootScope', function($scope)
	{
	  /**
	   * Manage network state.
	   *
	   * This class is intended to manage the connection status to the
	   * Ripple network.
	   *
	   * Note that code in other places *is allowed* to call the Ripple
	   * library directly. This is not to be intended to be an abstraction
	   * layer on top of an abstraction layer.
	   */
	  var Network = function ()
	  {
	    this.remote = new ripple.Remote(Options.server, true);
	    this.remote.on('connected', this.handleConnect.bind(this));
	    this.remote.on('disconnected', this.handleDisconnect.bind(this));

	    // Set network max transaction fee from Options, or default to 12 drops of XRP
	    this.remote.max_fee = Options.max_tx_network_fee || 12;

	    this.connected = false;
	  };

	  Network.prototype.init = function ()
	  {
	    this.remote.connect();
	  };

	  /**
	   * Setup listeners for identity state.
	   *
	   * This function causes the network object to start listening to
	   * changes in the identity state and automatically subscribe to
	   * accounts accordingly.
	   */
	  Network.prototype.listenId = function (id)
	  {
	    var self = this;
	  };

	  Network.prototype.handleConnect = function (e)
	  {
	    var self = this;
	    $scope.$apply(function () {
	      self.connected = true;
	      $scope.connected = true;
	      $scope.$broadcast('$netConnected');
	    });
	  };

	  Network.prototype.handleDisconnect = function (e)
	  {
	    var self = this;
	    $scope.$apply(function () {
	      self.connected = false;
	      $scope.connected = false;
	      $scope.$broadcast('$netDisconnected');
	    });
	  };

	  return new Network();
	}]);



/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * BOOKS
	 *
	 * The books service is used to keep track of orderbooks.
	 */

	var module = angular.module('books', ['network']);
	var Amount = ripple.Amount;


	module.factory('rpBooks', ['rpNetwork', '$q', '$rootScope', '$filter', 'rpId',
	function(net, $q, $scope, $filter, $id) {

	  var rowCount;

	  function loadBook(gets, pays, taker) {
	    return net.remote.book(gets.currency, gets.issuer,
	    pays.currency, pays.issuer,
	    taker);
	  }

	  function filterRedundantPrices(data, action, combine) {
	    var max_rows = Options.orderbook_max_rows || 100;

	    var price;
	    var lastprice;
	    var current;
	    var rpamount = $filter('rpamount');
	    var newData = jQuery.extend(true, {}, data);

	    rowCount = 0;
	    newData = _.values(_.compact(_.map(newData, function(d, i) {

	      // This check is redundant, but saves the CPU some work
	      if (rowCount > max_rows) return;

	      // rippled has a bug where it shows some unfunded offers
	      // We're ignoring them
	      if (d.taker_gets_funded === "0" || d.taker_pays_funded === "0")
	        return;

	      if (d.TakerGets.value) {
	        d.TakerGets.value = d.taker_gets_funded;
	      } else {
	        d.TakerGets = parseInt(Number(d.taker_gets_funded), 10);
	      }

	      if (d.TakerPays.value) {
	        d.TakerPays.value = d.taker_pays_funded;
	      } else {
	        d.TakerPays = parseInt(Number(d.taker_pays_funded), 10);
	      }

	      d.TakerGets = Amount.from_json(d.TakerGets);
	      d.TakerPays = Amount.from_json(d.TakerPays);

	      // You never know
	      if (!d.TakerGets.is_valid() || !d.TakerPays.is_valid())
	        return;

	      if (action === "asks") {
	        d.price = Amount.from_quality(d.BookDirectory,
	                                      d.TakerPays.currency(),
	                                      d.TakerPays.issuer(), {
	          base_currency: d.TakerGets.currency(),
	          reference_date: new Date()
	        });
	      } else {
	        d.price = Amount.from_quality(d.BookDirectory,
	                                      d.TakerGets.currency(),
	                                      d.TakerGets.issuer(), {
	          inverse: true,
	          base_currency: d.TakerPays.currency(),
	          reference_date: new Date()
	        });
	      }

	      var price = rpamount(d.price, {
	        rel_precision: 4,
	        rel_min_precision: 2
	      });

	      // Don't combine current user's orders.
	      if (d.Account == $id.account) {
	        d.my = true;
	      }

	      if (lastprice === price && !d.my) {
	        if (combine) {
	          newData[current].TakerPays = Amount.from_json(newData[current].TakerPays).add(d.TakerPays);
	          newData[current].TakerGets = Amount.from_json(newData[current].TakerGets).add(d.TakerGets);
	        }
	        d = false;
	      } else current = i;

	      if (!d.my)
	        lastprice = price;

	      if (d) rowCount++;

	      if (rowCount > max_rows) return false;

	      return d;
	    })));

	    var key = action === "asks" ? "TakerGets" : "TakerPays";
	    var sum;
	    _.each(newData, function (order, i) {
	      if (sum) sum = order.sum = sum.add(order[key]);
	      else sum = order.sum = order[key];
	    });

	    return newData;
	  }

	  return {
	    get: function(first, second, taker) {
	      var asks = loadBook(first, second, taker);
	      var bids = loadBook(second, first, taker);

	      var model = {
	        asks: filterRedundantPrices(asks.offersSync(), 'asks', true),
	        bids: filterRedundantPrices(bids.offersSync(), 'bids', true)
	      };

	      function handleAskModel(offers) {
	        $scope.$apply(function () {
	          model.asks = filterRedundantPrices(offers, 'asks', true);
	          model.updated = true;
	        });
	      }

	      function handleAskTrade(gets, pays) {
	        $scope.$apply(function () {
	          model.last_price = gets.ratio_human(pays);
	          model.updated = true;
	        });
	      }
	      asks.on('model', handleAskModel);
	      asks.on('trade', handleAskTrade);

	      function handleBidModel(offers) {
	        $scope.$apply(function () {
	          model.bids = filterRedundantPrices(offers, 'bids', true);
	          model.updated = true;
	        });
	      }

	      function handleBidTrade(gets, pays) {
	        $scope.$apply(function () {
	          model.last_price = pays.ratio_human(gets);
	          model.updated = true;
	        });
	      }
	      bids.on('model', handleBidModel);
	      bids.on('trade', handleBidTrade);

	      model.unsubscribe = function() {
	        asks.removeListener('model', handleAskModel);
	        asks.removeListener('trade', handleAskTrade);
	        bids.removeListener('model', handleBidModel);
	        bids.removeListener('trade', handleBidTrade);
	      };

	      return model;
	    },

	    getLength: function() {
	      return rowCount;
	    }
	  };
	}]);


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * TRANSACTIONS
	 *
	 * The transactions service is used to listen to all Ripple network
	 * transactions.
	 *
	 * This obviously won't scale, but it'll do long enough for us (or somebody
	 * else) to come up with something better.
	 */

	var module = angular.module('transactions', ['network']);

	module.factory('rpTransactions', ['$rootScope', 'rpNetwork',
	                                  function($scope, net) {
	  var listeners = [],
	      subscribed = false;

	  function subscribe() {
	    if (subscribed) return;
	    net.remote.request_subscribe("transactions").request();
	    subscribed = true;
	  }

	  function handleTransaction(msg) {
	    $scope.$apply(function () {
	      listeners.forEach(function (fn) {
	        fn(msg);
	      });
	    });
	  }

	  net.remote.on('net_transaction', handleTransaction);

	  return {
	    addListener: function (fn) {
	      listeners.push(fn);
	      subscribe();
	    },
	    removeListener: function (fn) {
	      var position = -1;
	      for (var i = 0, l = listeners.length; i < l; i++) {
	        if (listeners[i] === fn) {
	          position = i;
	        }
	      }
	      if (position < 0) return;
	      listeners.splice(position, 1);
	    }
	  };
	}]);


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * LEDGER
	 *
	 * The ledger service is used to provide information that requires watching the
	 * entire ledger.
	 *
	 * This obviously won't scale, but it'll do long enough for us (or somebody
	 * else) to come up with something better.
	 */

	var module = angular.module('ledger', ['network', 'transactions']);

	module.factory('rpLedger', ['$q', '$rootScope', 'rpNetwork', 'rpTransactions',
	                            function($q, $rootScope, net, transactions)
	{

	  var offerPromise = $q.defer();
	  var tickerPromise = $q.defer();
	  var requested = false;

	  var ledger = {
	    offers: offerPromise.promise,
	    tickers: tickerPromise.promise,
	    getOrders: getOrders
	  };

	  function filterOrder(buyCurrency, sellCurrency, buyIssuer, sellIssuer,
	                       pays, gets) {
	    if (buyCurrency !== gets.currency || sellCurrency !== pays.currency) {
	      return false;
	    }

	    if (buyCurrency !== 'XRP' && buyIssuer && gets.issuer !== buyIssuer) {
	      return false;
	    }

	    if (sellCurrency !== 'XRP' && sellIssuer && pays.issuer !== sellIssuer) {
	      return false;
	    }

	    return true;
	  }

	  function getOrders(buyCurrency, sellCurrency, buyIssuer, sellIssuer) {
	    var obj = {
	      asks: [],
	      bids: []
	    };

	    if (!Array.isArray(ledger.offers)) return obj;

	    ledger.offers.forEach(function (node) {
	      var gets = rewriteAmount(node.TakerGets);
	      var pays = rewriteAmount(node.TakerPays);

	      if (filterOrder(buyCurrency, sellCurrency, buyIssuer, sellIssuer, pays, gets)) {
	        obj.asks.push({i: gets, o: pays});

	        // A bid can't also be an ask
	        return;
	      }

	      if (filterOrder(buyCurrency, sellCurrency, buyIssuer, sellIssuer, gets, pays)) {
	        obj.bids.push({i: pays, o: gets});
	      }
	    });

	    obj.asks.sort(function (a, b) {
	      var aRatio = a.o.amount.ratio_human(a.i.amount, {reference_date: new Date()});
	      var bRatio = b.o.amount.ratio_human(b.i.amount, {reference_date: new Date()});
	      return aRatio.compareTo(bRatio);
	    });

	    obj.bids.sort(function (a, b) {
	      var aRatio = a.o.amount.ratio_human(a.i.amount, {reference_date: new Date()});
	      var bRatio = b.o.amount.ratio_human(b.i.amount, {reference_date: new Date()});
	      return bRatio.compareTo(aRatio);
	    });

	    fillSum(obj.asks, 'i');
	    fillSum(obj.bids, 'i');

	    return obj;
	  }

	  function rewriteAmount(amountJson) {
	    var amount = ripple.Amount.from_json(amountJson);
	    return {
	      amount: amount,
	      // Pretty dirty hack, but to_text for native values gives 1m * value...
	      // In the future we will likely remove this field altogether (and use
	      // Amount class math instead), so it's ok.
	      num: +amount.to_human({group_sep: false}),
	      currency: amount.currency().to_human(),
	      issuer: amount.issuer().to_json()
	    };
	  }

	  /**
	   * Fill out the sum field in the bid or ask orders array.
	   */
	  function fillSum(array, field) {
	    var sum = null;
	    for (var i = 0, l = array.length; i<l; i++) {
	      if (sum === null) {
	        sum = array[i][field].amount;
	      } else {
	        sum = sum.add(array[i][field].amount);
	      }
	      array[i].sum = sum;
	    }
	  }

	  if(net.connected) {
	    doRequest();
	  }

	  net.on('connected', function(){
	    doRequest();
	  });

	  function doRequest()
	  {
	    if (requested) return;

	    net.remote.request_ledger("ledger_closed", "full")
	        .on('success', handleLedger)
	        .request();

	    transactions.addListener(handleTransaction);

	    requested = true;
	  }

	  function handleTransaction(msg)
	  {
	    // XXX: Update the ledger state using this transaction's metadata
	  }

	  function handleLedger(e)
	  {
	    $rootScope.$apply(function(){
	      var offers = e.ledger.accountState.filter(function (node) {
	        return node.LedgerEntryType === "Offer";
	      });

	      offerPromise.resolve(offers);
	      ledger.offers = offers;
	    });
	  }

	  return ledger;
	}]);


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * POPUP
	 *
	 * The popup service is used to provide modals, alerts, and confirmation screens
	 */

	var module = angular.module('popup', []);

	module.factory('rpPopup', ['$compile',
	                           function ($compile)
	{
	  var popupService = {};

	  // Get the popup
	  popupService.getPopup = function(create)
	  {
	    if (!popupService.popupElement && create)
	    {
	      popupService.popupElement = $( '<div class="modal fade"></div>' );
	      popupService.popupElement.appendTo( 'BODY' );
	    }

	    return popupService.popupElement;
	  };

	  popupService.compileAndRunPopup = function (popup, scope, options) {
	    $compile(popup)(scope);
	    popup.modal(options);
	  };

	  popupService.blank = function(content,scope) {
	    var popup = popupService.getPopup(true);

	    var html = '<div class="modal-dialog"><div class="modal-content">';
	    html += content;
	    html += '</div></div>';

	    popup.html(html);

	    popupService.compileAndRunPopup(popup, scope);
	  };

	  popupService.confirm = function(title, actionText, actionButtonText, actionFunction, actionButtonCss, cancelButtonText, cancelFunction, cancelButtonCss, scope, options) {
	    actionText = (actionText) ? actionText : "Are you sure?";
	    actionButtonText = (actionButtonText) ? actionButtonText : "Ok";
	    actionButtonCss = (actionButtonCss) ? actionButtonCss : "btn btn-info";
	    cancelButtonText = (cancelButtonText) ? cancelButtonText : "Cancel";
	    cancelButtonCss = (cancelButtonCss) ? cancelButtonCss : "";

	    var popup = popupService.getPopup(true);
	    var confirmHTML = '<div class="modal-dialog"><div class="modal-content">';

	    if (title) {
	      confirmHTML += "<div class=\"modal-header\"><h1>"+title+"</h1></div>";
	    }

	    confirmHTML += "<div class=\"modal-body\"><p class=\"question\">"+actionText+"</p>"
	        +    "<p class=\"actions\">";

	    if (cancelFunction) {
	      confirmHTML += "<a class=\"" + cancelButtonCss + " btn-cancel\" ng-click=\""+cancelFunction+"\">"+cancelButtonText+"</a>";
	    }
	    else {
	      confirmHTML += "<a class=\"" + cancelButtonCss + " btn-cancel\">"+cancelButtonText+"</a>";
	    }

	    if (actionFunction) {
	      confirmHTML += "<button class=\"" + actionButtonCss + " btn-cancel\" ng-click=\""+actionFunction+"\">"+actionButtonText+"</button>";
	    }
	    else {
	      confirmHTML += "<button class=\"" + actionButtonCss + " btn-cancel\">"+actionButtonText+"</button>";
	    }

	    confirmHTML += "</p></div></div></div>";

	    popup.html(confirmHTML);

	    if (!actionFunction) {
	      popup.find(".btn-primary").click(function () {
	        popupService.close();
	      });
	    }

	    if (!cancelFunction) {
	      popup.find(".btn-cancel").click(function () {
	        popupService.close();
	      });
	    }

	    popupService.compileAndRunPopup(popup, scope, options);
	  };

	  popupService.close = function()
	  {
	    var popup = popupService.getPopup();
	    if (popup) {
	      popup.modal('hide');
	    }
	  };

	  return popupService;
	}]);


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * RIPPLE.TXT
	 *
	 * The ripple.txt service looks up and caches ripple.txt files.
	 *
	 * These files are used to do DNS-based verifications autonomously on the
	 * client-side. Quite neat when you think about it and a decent solution until
	 * we have a network-internal nickname system.
	 */

	var module = angular.module('rippletxt', []);

	module.factory('rpRippleTxt', ['$q', '$rootScope',
	                               function ($q, $scope) {
	  var txts = {};

	  function get(domain) {
	    var txtPromise = $q.defer();

	    var urls = [
	      'http://www.'+domain+'/ripple.txt',
	      'http://'+domain+'/ripple.txt'
	    ].reverse();
	    var next = function (xhr, status) {
	      if (!urls.length) {
	        txtPromise.reject(new Error("No ripple.txt found"));
	        return;
	      }
	      var url = urls.pop();
	      $.ajax({
	        url: url,
	        dataType: 'text',
	        success: function (data) {
	          $scope.$apply(function() {
	            var sections = parse(data);
	            txts[domain] = sections;
	            txtPromise.resolve(sections);
	          });
	        },
	        error: function (xhr, status) {
	          setImmediate(function () {
	            $scope.$apply(function () {
	              next(xhr, status);
	            });
	          });
	        }
	      });
	    };
	    next();

	    return txtPromise.promise;
	  }

	  function parse(txt) {
	    txt = txt.replace('\r\n', '\n');
	    txt = txt.replace('\r', '\n');
	    txt = txt.split('\n');

	    var currentSection = "", sections = {};
	    for (var i = 0, l = txt.length; i < l; i++) {
	      var line = txt[i];
	      if (!line.length || line[0] === '#') {
	        continue;
	      } else if (line[0] === '[' && line[line.length-1] === ']') {
	        currentSection = line.slice(1, line.length-1);
	        sections[currentSection] = [];
	      } else {
	        line = line.replace(/^\s+|\s+$/g, '');
	        if (sections[currentSection]) {
	          sections[currentSection].push(line);
	        }
	      }
	    }

	    return sections;
	  }

	  return {
	    get: get,
	    parse: parse
	  };
	}]);


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * FEDERATION
	 *
	 * The federation service looks up and caches federation queries.
	 *
	 * These files are used to do DNS-based verifications autonomously on the
	 * client-side. Quite neat when you think about it and a decent solution until
	 * we have a network-internal nickname system.
	 */

	var module = angular.module('federation', []);

	module.factory('rpFederation', ['$q', '$rootScope', 'rpRippleTxt',
	                               function ($q, $scope, $txt) {
	  var txts = {};

	  function check_email(email) {
	    var federationPromise = $q.defer();

	    var tmp = email.split('@');
	    var domain = tmp.pop();
	    var user = tmp.join('@');

	    var txtPromise = $txt.get(domain);

	    if (txtPromise) {
	      if ("function" === typeof txtPromise.then) {
	        txtPromise.then(processTxt, handleNoTxt);
	      } else {
	        processTxt(txtPromise);
	      }
	    } else {
	      handleNoTxt();
	    }

	    return federationPromise.promise;

	    function handleNoTxt() {
	      federationPromise.reject({
	        result: "error",
	        error: "noRippleTxt",
	        error_message: "Ripple.txt not available for the requested domain."
	      });
	    }
	    function processTxt(txt) {
	      if (txt.federation_url) {
	        $.ajax({
	          url: txt.federation_url[0],
	          dataType: "json",
	          data: {
	            type: 'federation',
	            domain: domain,
	            destination: user,
	            // DEPRECATED "destination" is a more neutral name for this field
	            //   than "user"
	            user: user
	          },
	          error: function () {
	            $scope.$apply(function() {
	              federationPromise.reject({
	                result: "error",
	                error: "unavailable",
	                error_message: "Federation gateway did not respond."
	              });
	            });
	          },
	          success: function (data) {
	            $scope.$apply(function() {
	              if ("object" === typeof data &&
	                  "object" === typeof data.federation_json &&
	                  data.federation_json.type === "federation_record" &&
	                  (data.federation_json.user === user ||
	                   data.federation_json.destination === user) &&
	                  data.federation_json.domain === domain) {
	                federationPromise.resolve(data.federation_json);
	              } else if ("string" === typeof data.error) {
	                federationPromise.reject({
	                  result: "error",
	                  error: "remote",
	                  error_remote: data.error,
	                  error_message: data.error_message
	                    ? "Service error: " + data.error_message
	                    : "Unknown remote service error."
	                });
	              } else {
	                federationPromise.reject({
	                  result: "error",
	                  error: "unavailable",
	                  error_message: "Federation gateway's response was invalid."
	                });
	              }
	            });
	          }
	        });
	      } else {
	        federationPromise.reject({
	          result: "error",
	          error: "noFederation",
	          error_message: "Federation is not available on the requested domain."
	        });
	      }
	    }
	  }

	  return {
	    check_email: check_email
	  };
	}]);


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * DOMAIN ALIAS
	 *
	 * The domain alias service resolves ripple address to domains.
	 *
	 * In the AccountRoot entry of any ripple account users can provide a reference
	 * to a domain they own. Ownership of the domain is verified via the ripple.txt
	 * magic file.
	 *
	 * This service provides both the lookup in the ledger and the subsequent
	 * verification via ripple.txt.
	 */

	var module = angular.module('domainalias', ['network', 'rippletxt']);

	module.factory('rpDomainAlias', ['$q', '$rootScope', 'rpNetwork', 'rpRippleTxt',
	                                 function ($q, $scope, net, txt)
	{
	  // Alias caching
	  var aliases = {};

	  /**
	   * Validates a domain against an object parsed from ripple.txt data.
	   *
	   * @private
	   */
	  function validateDomain(domain, address, data)
	  {
	    // Validate domain
	    if (!data.domain ||
	        data.domain.length !== 1 ||
	        data.domain[0] !== domain) {
	      return false;
	    }

	    // Validate address
	    if (!data.accounts) {
	      return false;
	    }
	    for (var i = 0, l = data.accounts.length; i < l; i++) {
	      if (data.accounts[i] === address) {
	        return true;
	      }
	    }

	    return false;
	  }

	  function getAliasForAddress(address)
	  {
	    // Return the promise if there's already a lookup in progress for this address
	    if (aliases[address] && aliases[address].promise) {
	      return aliases[address].promise;
	    }

	    var aliasPromise = $q.defer();

	    // We might already have the alias for given ripple address
	    if (aliases[address] && aliases[address].resolved) {
	      if (aliases[address].domain) {
	        aliasPromise.resolve(aliases[address].domain);
	      }
	      else {
	        aliasPromise.reject(new Error("Invalid domain"));
	      }
	    }

	    // If not, then get the alias
	    else {
	      net.remote.request_account_info(address)
	        .on('success', function (data) {
	          if (data.account_data.Domain) {
	            $scope.$apply(function () {
	              var domain = sjcl.codec.utf8String.fromBits(sjcl.codec.hex.toBits(data.account_data.Domain));

	              var txtData = txt.get(domain);
	              txtData.then(
	                function (data) {
	                  aliases[address] = {
	                    resolved: true
	                  };

	                  if(validateDomain(domain, address, data)) {
	                    aliases[address].domain = domain;
	                    aliasPromise.resolve(domain);
	                  }
	                  else {
	                    aliasPromise.reject(new Error("Invalid domain"));
	                  }
	                },
	                function (error) {
	                  aliases[address] = {
	                    resolved: true
	                  };
	                  aliasPromise.reject(new Error(error));
	                }
	              );
	            });
	          }
	          else {
	            aliases[address] = {
	              resolved: true
	            };
	            aliasPromise.reject(new Error("No domain found"));
	          }
	        })
	        .on('error', function () {
	          aliasPromise.reject(new Error("No domain found"));
	        })
	        .request();

	      // Because finally is a reserved word in JavaScript and reserved keywords
	      // are not supported as property names by ES3, we're invoking the
	      // method like aliasPromise['finally'](callback) to make our code
	      // IE8 and Android 2.x compatible.
	      aliasPromise.promise['finally'](function(){
	        aliases[address].promise = false;
	      });

	      aliases[address] = {
	        promise: aliasPromise.promise
	      };

	    }

	    return aliasPromise.promise;
	  }

	  return {
	    getAliasForAddress: getAliasForAddress
	  };
	}]);


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * APP MANAGER
	 *
	 * The app manager service is used to communicate with the Ripple apps
	 * and connect them to the client.
	 */

	var module = angular.module('appManager', ['domainalias','integrationProfileManager']);

	module.service('rpAppManager', ['$rootScope', '$http', 'rpDomainAlias', 'rpRippleTxt', 'rpProfileManager',
	  function($scope, $http, aliasService, txt, profileManager)
	{
	  var log = function(){
	    var mainArguments = Array.prototype.slice.call(arguments);
	    mainArguments[0] = '%c ' + mainArguments[0] + ' ';
	    mainArguments.splice(1, 0, 'background: green; color: white');
	    console.log.apply(console,mainArguments);
	  };

	  /**
	   * Load all apps
	   */
	  var init = function () {
	    $scope.$watch('userBlob.data.apps', function(apps){
	      if (apps && apps.length) {
	        apps.forEach(function(appInBlob){
	          loadApp(appInBlob.rippleAddress, function(err, app){
	            $scope.apps[appInBlob.rippleAddress] = app;
	          });
	        })
	      }
	    });
	  };

	  // Loaded apps
	  $scope.apps = {};

	  /**
	   * App object
	   *
	   * @param manifest
	   * @constructor
	   */
	  var App = function(manifest){
	    this.name = manifest.name;
	    this.description = manifest.description;
	    this.image = manifest.imageUrl;
	    this.rippleAddress = manifest.rippleAddress;
	    this.profiles = [];

	    var self = this;

	    _.each(manifest.profiles, function(profile,key){
	      self.profiles[key] = profileManager.getProfile(profile);
	    });
	  };

	  App.prototype.findProfile = function (type) {
	    return _.findWhere(this.profiles, {type:type});
	  };

	  App.prototype.getInboundBridge = function (currency) {
	    var found;

	    this.profiles.forEach(function(profile,key){
	      if ('inboundBridge' === profile.type) {
	        profile.currencies.forEach(function(c){
	          if (currency.toUpperCase() === c.currency) {
	            found = profile;
	          }
	        })
	      }
	    });

	    return found;
	  };

	  var getApp = function(rippleAddress,callback) {
	    $scope.$watch('apps', function(apps){
	      if (app = apps[rippleAddress]) {
	        callback(null, app);
	      }
	    }, true);
	  };

	  var getAllApps = function(callback) {
	    $scope.$watch('apps', function(apps){
	      if (!$.isEmptyObject(apps)) callback(apps);
	    }, true);
	  };

	  /**
	   * Save app to userBlob
	   *
	   * @param app
	   */
	  var save = function(app) {
	    var watcher = $scope.$watch('userBlob', function(userBlob){
	      if (userBlob.data.created && !_.findWhere($scope.userBlob.data.apps, {rippleAddress:app.rippleAddress})) {
	        $scope.userBlob.unshift("/apps", {
	          name: app.name,
	          rippleAddress: app.rippleAddress
	        });
	        
	        watcher();
	      }
	    });
	  };

	  /**
	   * Initializes Ripple App.
	   *
	   * @param rippleAddress
	   * @param callback
	   */
	  var loadApp = function(rippleAddress, callback){
	    var domain, manifest;

	    // Get Domain
	    log('appManager:','Looking up',rippleAddress);

	    var alias = aliasService.getAliasForAddress(rippleAddress);
	    alias.then(
	      // Fulfilled
	      function (domain) {
	        log('appManager:','The domain for',rippleAddress,'is',domain);
	        log('appManager:','Looking up ',domain,'for ripple.txt');

	        // Get ripple.txt
	        var txtPromise = txt.get(domain);
	        txtPromise.then(
	          // Fulfilled
	          function(rippletxt){
	            log('appManager:','Got ripple.txt',rippletxt);

	            if (rippletxt.manifest_url) {
	              log('appManager:','Looking up manifest',rippletxt.manifest_url);

	              $http({url: rippletxt.manifest_url, method: 'get'})
	                .success(function(data, status, headers, config) {
	                  manifest = jQuery.extend(true, {}, data);

	                  log('appManager:','Got the manifest for',manifest.name,manifest);

	                  if (!validateManifest(manifest)) {
	                    log('appManager:','Manifest is invalid.');
	                    return;
	                  }

	                  // Create the App object.
	                  $scope.apps[rippleAddress] = new App(manifest);

	                  callback(null, $scope.apps[rippleAddress]);
	                })
	                .error(function(data, status, headers, config) {
	                  log("appManager:','Can't get the manifest");
	                });
	            }
	          },

	          // Rejected
	          function(reason) {
	            callback(reason)
	          }
	        )
	      },

	      // Rejected
	      function(reason){
	        callback(reason);
	      }
	    );
	  };

	  /**
	   * Function to validate manifest file
	   *
	   * @param m manifest json
	   * @returns {boolean}
	   */
	  var validateManifest = function(m) {
	    // TODO more validation
	    if (!m.name || !m.rippleAddress || !m.profiles) {
	      return;
	    }

	    // Ripple address is wrong
	    if (!ripple.UInt160.from_json(m.rippleAddress).is_valid()) return;

	    return true;
	  };

	  return {
	    getApp: getApp,
	    getAllApps: getAllApps,
	    loadApp: loadApp,
	    init: init,
	    save: save
	  }
	}]);

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Profile manager
	 *
	 * This service is used for managing profiles
	 */

	var module = angular.module('integrationProfileManager', [
	  'integrationAccount',
	  'integrationHistory',
	  'integrationTrust',
	  'integrationInboundBridge'
	]);

	module.service('rpProfileManager', [
	  '$rootScope',
	  'rpAccountProfile',
	  'rpHistoryProfile',
	  'rpTrustProfile',
	  'rpInboundBridgeProfile',
	  function(
	    $scope,
	    accountProfile,
	    historyProfile,
	    trustProfile,
	    inboundBridgeProfile
	  )
	{
	  this.getProfile = function(manifest) {
	    var profiles = {
	      'accountProfile': function(){return accountProfile.fromManifest(manifest)},
	      'historyProfile': function(){return historyProfile.fromManifest(manifest)},
	      'trustProfile': function(){return trustProfile.fromManifest(manifest)},
	      'inboundBridgeProfile': function(){return inboundBridgeProfile.fromManifest(manifest)}
	    };

	    return profiles[manifest.type + 'Profile']();
	  };
	}]);

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Account profile
	 *
	 * This is the "Account" profile implementation
	 */

	var module = angular.module('integrationAccount', []);

	// TODO Sign sent data
	module.service('rpAccountProfile', ['$rootScope', 'rpNetwork', '$http',
	  function($scope, $network, $http)
	{
	  this.accountProfile = function(manifest) {
	    return {
	      type: manifest.type,
	      version: manifest.version,

	      getFields: function () {
	        return manifest.signupFields
	      },
	      signup: function(fields, callback) {
	        $http({
	          url: manifest.urls.signup,
	          method: 'POST',
	          data: fields
	        })
	        .success(function(response){
	          if (response.status === 'error') {
	            callback({
	              message: response.message
	            });

	            return;
	          }

	          callback(null, response);
	        })
	        .error(function(data,status){
	          callback({
	            message: 'Unable to sign up.'
	          });
	        })
	      },
	      getUser: function(rippleAddress, callback) {
	        $http({
	          url: manifest.urls.user,
	          method: 'GET',
	          params: {rippleAddress: rippleAddress}
	        })
	        .success(function(response){
	          if (response.status === 'error') {
	            callback({
	              message: response.message
	            });

	            return;
	          }

	          callback(null, response);
	        })
	        .error(function(data,status){
	          callback({
	            message: "Can't get the user."
	          });
	        })
	      }
	    }
	  };

	  this.fromManifest = function (manifest) {
	    return new this.accountProfile(manifest);
	  }
	}]);

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * History profile
	 *
	 * This is the "History" profile implementation
	 */

	var module = angular.module('integrationHistory', []);

	module.service('rpHistoryProfile', ['$rootScope', 'rpNetwork', '$http',
	  function($scope, $network, $http)
	{
	  this.historyProfile = function(manifest) {
	    return {
	      type: manifest.type,
	      version: manifest.version,

	      getTransactions: function(rippleAddress, callback) {
	        $http({
	          url: manifest.urls.transactions,
	          method: 'GET',
	          params: {
	            rippleAddress: rippleAddress
	          }
	        })
	        .success(function(response){
	          if (response.status === 'error') {
	            callback({
	              message: response.message
	            });

	            return;
	          }

	          callback(null, response.history);
	        })
	        .error(function(data,status){
	          callback({
	            message: 'Unable to fetch the history.'
	          });
	        })
	      }
	    }
	  };

	  this.fromManifest = function (manifest) {
	    return new this.historyProfile(manifest);
	  }
	}]);

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Trust profile
	 *
	 * This is the "Trust" profile implementation
	 */

	var module = angular.module('integrationTrust', ['txQueue','keychain']);

	// TODO Sign sent data
	module.service('rpTrustProfile', ['$rootScope', 'rpNetwork', 'rpTxQueue', 'rpKeychain', 'rpId',
	  function($scope, network, txQueue, keychain, id)
	{
	  this.trustProfile = function(manifest) {
	    return {
	      type: manifest.type,
	      version: manifest.version,

	      // TODO remove this
	      grantNeccessaryTrusts: function() {
	        manifest.currencies.forEach(function(currency){
	          // Is there an existing trust line?
	          if(existingTrustLine = $scope.lines[currency.issuer + currency.currency.toUpperCase()]) {
	            // Is the trust limit enough?
	            if(existingTrustLine.limit.to_number() >= currency.amount)
	              // We're good with the existing trust line
	              return;
	          }

	          // Ok, looks like we need to set a trust line
	          var tx = network.remote.transaction();
	          tx.rippleLineSet(id.account, currency.amount + '/' + currency.currency + '/' + currency.issuer);
	          tx.setFlags('NoRipple');

	          // txQueue please set the trust line asap.
	          txQueue.addTransaction(tx);
	        });

	        if('function' == typeof callback) callback();
	      }
	    }
	  };

	  this.fromManifest = function (manifest) {
	    return new this.trustProfile(manifest);
	  }
	}]);

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Inbound Bridge profile
	 *
	 * This is the "InboundBridge" profile implementation
	 */

	var module = angular.module('integrationInboundBridge', []);

	module.service('rpInboundBridgeProfile', ['$rootScope', 'rpNetwork', 'rpId', '$http', 'rpTxQueue',
	  function($scope, network, id, $http, txQueue)
	{
	  this.inboundBridgeProfile = function(manifest) {
	    return {
	      type: manifest.type,
	      version: manifest.version,
	      bridgeType: manifest.bridgeType,
	      currencies: manifest.currencies,

	      /**
	       * Trust one of the inbound bridge supported currencies.
	       *
	       * @param currency
	       * @param issuer
	       */
	      trust: function(currency,issuer) {
	        // Does this inbound bridge support this currency?
	        var line = _.findWhere(manifest.currencies, {
	          currency: currency.toUpperCase(),
	          issuer: issuer
	        });

	        // Nope
	        if (!line) {
	          console.warn("This service doesn't support " + currency + '/' + issuer);
	          return;
	        }

	        // Is there an existing trust line?
	        if(existingTrustLine = $scope.lines[line.issuer + line.currency]) {
	          // Is the trust limit enough?
	          if(existingTrustLine.limit.to_number() >= line.amount)
	          // We're good with the existing trust line
	            return;
	        }

	        // Is there an existing trustTx in queue?
	        // (Does this really belong here? maybe just move it to txqueue.js?)
	        var noNeed;
	        _.each(
	          // Find all trust transactions in queue
	          _.findWhere($scope.userBlob.data.txQueue, {type: "TrustSet"}),
	          function(elm,index,txInQueue){
	            // Does this fulfil our needs?
	            noNeed = txInQueue && txInQueue.details.currency === line.currency
	              && txInQueue.details.issuer === line.issuer
	              && txInQueue.details.value >= line.amount
	          }
	        );

	        // We already have the necessary trustTx waiting in line.
	        if (noNeed) return;

	        // Ok, looks like we need to set a trust line
	        var tx = network.remote.transaction();
	        tx.rippleLineSet(id.account, line.amount + '/' + line.currency + '/' + line.issuer);
	        tx.setFlags('NoRipple');

	        // txQueue please set the trust line asap.
	        txQueue.addTransaction(tx);
	      },

	      /**
	       * Get instructions on using the inbound bridge
	       *
	       * @param rippleAddress
	       * @param callback
	       */
	      getInstructions: function(rippleAddress, callback) {
	        $http({
	          url: manifest.urls.instructions,
	          method: 'GET',
	          params: {rippleAddress: rippleAddress}
	        })
	        .success(function(response){
	          if (response.status === 'error') {
	            callback({
	              message: response.message
	            });

	            return;
	          }

	          callback(null, response);
	        })
	        .error(function(data,status){
	          callback({
	            message: "Can't get the instructions."
	          });
	        })
	      },

	      /**
	       * Get pending deposits list
	       *
	       * @param rippleAddress
	       * @param callback
	       */
	      getPending: function(rippleAddress, callback) {
	        $http({
	          url: manifest.urls.pending,
	          method: 'GET',
	          params: {rippleAddress: rippleAddress}
	        })
	        .success(function(response){
	          if (response.status === 'error') {
	            callback({
	              message: response.message
	            });

	            return;
	          }

	          callback(null, response.deposits);
	        })
	        .error(function(data,status){
	          callback({
	            message: "Can't get pending deposits."
	          });
	        })
	      }
	    }
	  };

	  /**
	   * Create and return a new instance of inbound bridge based on manifest
	   *
	   * @param manifest
	   * @returns {profiles.inboundBridgeProfile}
	   */
	  this.fromManifest = function (manifest) {
	    return new this.inboundBridgeProfile(manifest);
	  }
	}]);

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(76);
	var Tab  = __webpack_require__(63).Tab;

	var RegisterTab = function ()
	{
	  Tab.call(this);
	};

	util.inherits(RegisterTab, Tab);

	RegisterTab.prototype.tabName = 'register';
	RegisterTab.prototype.pageMode = 'single';
	RegisterTab.prototype.parent = 'main';

	RegisterTab.prototype.generateHtml = function ()
	{
	  return __webpack_require__(64)();
	};

	RegisterTab.prototype.extraRoutes = [
	  { name: '/register/activate/:username/:token' }
	];

	RegisterTab.prototype.angular = function (module) {
	  module.controller('RegisterCtrl', ['$scope', '$rootScope', '$location', '$element',
	                                     'rpId', 'rpTracker', '$routeParams', 'rpKeychain',
	                                     function ($scope, $rootScope, $location, $element,
	                                               $id, $rpTracker, $routeParams, keychain)
	  {
	    /**
	     * Email verification
	     */
	    if ($routeParams.token) {
	      $id.verify({
	        username: $routeParams.username,
	        token: $routeParams.token
	      }, function(err, response){
	        if (err) {
	          $rootScope.verifyStatus = 'error';

	          $rpTracker.track('Email verification', {
	            result: 'failed',
	            message: err
	          });
	        }
	        else if ('success' === response.result) {
	          $rootScope.verifyStatus = 'verified';

	          $rpTracker.track('Email verification', {
	            result: 'success'
	          });
	        }
	      });

	      $rootScope.verifyStatus = 'verifying';
	      $rootScope.username = $routeParams.username;
	      $id.logout();
	      $location.path('/login');
	    }

	    /**
	     * User is already logged in
	     */
	    if ($id.loginStatus) {
	      $location.path('/balance');
	      return;
	    }

	    // Countries list
	    /*
	    var lang = store.get('ripple_language') || 'en';

	    $scope.countries = _.sortBy(require('../l10n/countries/' + lang + '.json'),
	      function(country){
	        return country;
	      }
	    );
	    */

	    $scope.reset = function()
	    {
	      $scope.username = '';
	      $scope.password = '';
	      $scope.passwordSet = {};
	      $scope.password1 = '';
	      $scope.password2 = '';
	      $scope.master = '';
	      $scope.key = '';
	      $scope.mode = 'form';
	      $scope.showMasterKeyInput = false;
	      $scope.submitLoading = false;

	      if ($scope.registerForm) $scope.registerForm.$setPristine(true);
	    };

	    $scope.register = function()
	    {
	      if ($scope.oldUserBlob) {
	        $scope.masterkey = $scope.oldUserBlob.data.master_seed;
	      }

	      $id.register({
	        'username': $scope.username,
	        'password': $scope.password1,
	        'email': $scope.email,
	        'masterkey': $scope.masterkey,
	        'oldUserBlob': $scope.oldUserBlob,
	        'oldUsername': $scope.oldUsername,
	        'oldPassword': $scope.oldPassword
	      },
	      function(err, key){
	        $scope.submitLoading = false;

	        if (err) {
	          $scope.mode = "failed";
	          $scope.error_detail = err.message;
	          return;
	        }
	        $scope.password = new Array($scope.password1.length+1).join("*");
	        $scope.keyOpen = key;
	        $scope.key = $scope.keyOpen[0] + new Array($scope.keyOpen.length).join("*");

	        $scope.mode = 'secret';
	      });
	    };

	    $scope.resendEmail = function()
	    {
	      $scope.resendLoading = true;

	      keychain.requestSecret($id.account, $id.username,
	        function (err, masterkey) {
	          if (err) {
	            console.log("client: register tab: error while " +
	              "unlocking wallet: ", err);
	            $scope.mode = "error";
	            $scope.error_type = "unlockFailed";
	            return;
	          }
	                    
	          $id.resendEmail({
	            id:$scope.userBlob.id,
	            url:$scope.userBlob.url,
	            username: $scope.userCredentials.username,
	            account_id: $scope.userBlob.data.account_id,
	            email: $scope.newEmail || $scope.userBlob.data.email,
	            masterkey: masterkey
	          }, function(err, response){
	            if (err) {
	              console.log('Error',err);
	              return;
	            }

	            // Update the blob
	            $scope.userBlob.set('/email', $scope.newEmail || $scope.userBlob.data.email);

	            $scope.resendLoading = false;
	            $scope.resendSuccess = true;
	          });
	        });
	    };

	    var updateFormFields = function(){
	      var username;
	      var password1;
	      var password2;

	      username = $element.find('input[name="register_username"]').eq(0).val();
	      password1 = $element.find('input[name="register_password1"]').eq(0).val();
	      password2 = $element.find('input[name="register_password2"]').eq(0).val();

	      if ("string" === typeof username) {
	        $scope.registerForm.register_username.$setViewValue(username);
	      }
	      if ("string" === typeof password1) {
	        $scope.registerForm.register_password1.$setViewValue(password1);
	      }
	      if ("string" === typeof password2) {
	        $scope.registerForm.register_password2.$setViewValue(password2);
	      }
	    };

	    /**
	     * Registration cases
	     *
	     * -- CASE --                                                            -- ACTION --
	     * 1. username or/and password is/are missing ----------------------------- show error
	     * 2. passwords do not match ---------------------------------------------- show error
	     * 3. username and password passed the validation
	     *    3.1 master key is not present
	     *        3.1.1 account exists
	     *              3.1.1.1 and we can login ---------------------------------- login
	     *              3.1.1.2 and we can't login -------------------------------- show error
	     *        3.1.2 account doesn't exist ------------------------------------- register and generate master key
	     *    3.3 master key is present
	     *        3.3.1 account exists, but we can't login ------------------------ show error
	     *        3.3.2 account exists and it uses the same master key =----------- login
	     *        3.3.3 account exists, and it uses another master key
	     *              3.3.2.1 master key is valid ------------------------------- tell him about the situation, and let him decide what to do
	     *              3.3.2.2 master key is invalid ----------------------------- show error
	     *        3.3.3 account doesn't exist ------------------------------------- register with given master key
	     */

	    $scope.submitForm = function()
	    {
	      // Disable submit button
	      $scope.submitLoading = true;

	      updateFormFields();

	      var regInProgress;

	      // TODO Update this. It cannot exist anymore, 'cause usernames are unique
	      $id.exists($scope.username, $scope.password1, function (error, exists) {
	        if (!regInProgress) {
	          if (!exists) {
	            regInProgress = true;

	            if (!store.disabled) {
	              store.set('ripple_settings', JSON.stringify(Options));
	            }

	            $scope.register();
	          } else {
	            $scope.mode = 'alreadyexists';
	          }
	        }
	      });
	    };

	    $scope.goToFund = function()
	    {
	      $scope.mode = 'form';
	      $scope.reset();

	      $rpTracker.track('Sign Up', {
	        'Used key': !!$scope.masterkey,
	        'Password strength': $scope.strength,
	        'Showed secret key': !!$scope.showSecret,
	        'Showed password': !!$scope.showPassword
	      });

	      $location.path('/fund');
	    };

	    $scope.reset();

	    // Unverified account login
	    if ($scope.unverified) {
	      $scope.mode = 'verification';
	    }
	  }]);
	};

	module.exports = RegisterTab;


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(76);
	var Tab = __webpack_require__(63).Tab;

	var LoginTab = function ()
	{
	  Tab.call(this);
	};

	util.inherits(LoginTab, Tab);

	LoginTab.prototype.tabName = 'login';
	LoginTab.prototype.pageMode = 'single';
	LoginTab.prototype.parent = 'main';

	LoginTab.prototype.generateHtml = function ()
	{
	  return __webpack_require__(65)();
	};

	LoginTab.prototype.angular = function (module) {
	  module.controller('LoginCtrl', ['$scope', '$element', '$routeParams',
	                                  '$location', 'rpId', '$rootScope',
	                                  'rpPopup', '$timeout', 'rpTracker', 'rpAuthFlow',
	                                  function ($scope, $element, $routeParams,
	                                            $location, $id, $rootScope,
	                                            popup, $timeout, $rpTracker, authflow)
	  {
	    if ($id.loginStatus) {
	      $location.path('/balance');
	      return;
	    }

	    $scope.attempts = 0;
	    $scope.error = '';
	    $scope.password = '';
	    $scope.token = '';
	    $scope.showRecover = false; 
	    $scope.rememberMe = true;     
	      
	    $scope.loginForm && $scope.loginForm.$setPristine(true);
	    $scope.backendMessages = [];
	    
	    //set username and password here so
	    //that the form will be valid if we are
	    //only verifying via 2FA    
	    if ($scope.twoFactor && $scope.twoFactor.tokenError) {
	      $scope.backendMessages.push({'backend': "2FA", 'message': $scope.twoFactor.tokenError.message});    
	    }
	    
	    // Autofill fix
	    $timeout(function(){
	      $scope.$apply(function () {
	        $scope.username = $element.find('input[name="login_username"]').val();
	        $scope.password = $element.find('input[name="login_password"]').val();
	      });
	    }, 1000);

	//    $rootScope.$on("$blobError", function (e, err) {
	//      console.log("BLOB ERROR", arguments);
	//      $scope.backendMessages.push({'backend': err.backend, 'message': err.message});
	//    });

	    var updateFormFields = function(){
	      var username;
	      var password;

	      // There are multiple login forms due to the Ripple URI login feature.
	      // But only one of them should be visible and that's the one we want.
	      username = $element.find('input[name="login_username"]:visible').eq(0).val();
	      password = $element.find('input[name="login_password"]:visible').eq(0).val();

	      if ("string" === typeof username) {
	        $scope.loginForm.login_username.$setViewValue(username);
	      }
	      if ("string" === typeof password) {
	        $scope.loginForm.login_password.$setViewValue(password);
	      }
	    };

	    // Issues #1024, #1060
	    $scope.$watch('username',function(){
	      $rootScope.username = $scope.username;
	      $timeout(function(){
	        $scope.$apply(function () {
	          updateFormFields();
	        })
	      }, 50);
	    });

	    // Ok, now try to remove this line and then go write "a" for wallet name, and "a" for passphrase.
	    // "Open wallet" is still disabled hah? no worries, just enter anything else and it will be activated.
	    // Probably this is an AngularJS issue. Had no time to check it yet.
	    $scope.$watch('password');

	    $scope.submitForm = function()
	    {
	      if ($scope.ajax_loading) return;
	      
	      $scope.backendMessages = [];
	      
	      //submitting a verification code
	      if ($scope.twoFactor) {
	        var options = {
	          url         : $scope.twoFactor.blob_url,
	          id          : $scope.twoFactor.blob_id,
	          device_id   : $scope.twoFactor.device_id,
	          token       : $scope.token,
	          remember_me : $scope.rememberMe
	        };
	        
	        $id.verifyToken(options, function(err, resp) {
	          $scope.ajax_loading = false;

	          if (err) {
	            $scope.status = 'Verification Falied:';
	            $scope.backendMessages.push({'backend': "2FA", 'message': err.message});
	            
	          } else {
	            var username = (""+$scope.username).trim();
	            var keys     = {
	              id    : $scope.twoFactor.blob_id,
	              crypt : $scope.twoFactor.blob_key
	            }

	            //save credentials for login  
	            $id.storeLoginKeys($scope.twoFactor.blob_url, username, keys);
	            $id.setUsername(username);
	            store.set('device_id', $scope.twoFactor.device_id);
	            setImmediate(login);
	          }
	        })
	        
	        $scope.ajax_loading = true;
	        $scope.error  = '';
	        $scope.status = 'verifiying...';
	        return;
	      }

	      // Issue #36: Password managers may change the form values without
	      // triggering the events Angular.js listens for. So we simply force
	      // an update of Angular's model when the form is submitted.
	      updateFormFields();

	      setImmediate(login);

	      $scope.ajax_loading = true;
	      $scope.error  = '';
	      $scope.status = 'Cargando...';
	    };
	    
	    //initiate the login
	    function login () {      
	      if ($scope.twoFactor) {
	        $id.relogin(loginCallback);
	        
	      } else {
	        $id.login({
	          username   : $scope.username,
	          password   : $scope.password
	        }, loginCallback);
	      }
	    }
	     
	    //handle the login results    
	    function loginCallback (err, blob) {
	        
	      $scope.ajax_loading = false;
	      
	      //blob has 2FA enabled
	      if (err && err.twofactor) {
	        if (err.twofactor.tokenError) {
	          $scope.status = 'Request token:';
	          $scope.backendMessages.push({'backend': "2FA", 'message': err.twofactor.tokenError.message});       
	          return;
	        }

	        $scope.twoFactor     = err.twofactor;
	        $scope.twoFactor.via = '';//TODO remove this from blob response
	        $scope.status        = '';
	        $scope.maskedPhone   = err.twofactor.masked_phone;

	        //TODO: different display if 'ignored' is set,
	        //meaning the user has the app
	        if (err.twofactor.tokenResponse) {
	          $scope.twoFactor.via = err.twofactor.tokenResponse.via;
	        }

	        return;
	      
	      //login failed for a different reason
	      } else if (err) {
	        if (++$scope.attempts>2) {
	          $scope.showRecover = true;
	        }

	        $scope.status = 'Login failed:';

	        if (err.name === "OldBlobError") {
	          popup.confirm("Wallet Upgrade", "Ripple is upgrading the wallet encryption format. After the upgrade, only Ripple clients 0.2.24 or higher can access your wallet.<br><br>If you use other clients, please make sure they are upgraded to the current version.",
	                        "OK", "migrateConfirm()", null,
	                        "Abort login", null, null,
	                        $scope, {});

	          $scope.migrateConfirm = function () {
	            $id.allowOldBlob = true;
	            $scope.submitForm();
	          };
	        }

	        if (err.name !== "BlobError") {
	          $scope.backendMessages.push({'backend': "ID", 'message': err.message});
	        }

	        $rpTracker.track('Login', {
	          'Status': 'error',
	          'Message': err.message
	        });

	        if (!$scope.$$phase) {
	          $scope.$apply();
	        }
	        return;
	      }

	      $rpTracker.track('Login', {
	        'Status': 'success'
	      });

	      $scope.status = '';
	      if ($routeParams.tab) {
	        $location.path('/'+$routeParams.tab);
	      } else {
	        if ($rootScope.verifyStatus) {
	          $rootScope.verifyStatus = '';
	          $location.path('/fund');
	        }
	        else {
	          $location.path('/balance');
	        }
	      }
	    } 
	 
	    $scope.requestToken = function() {
	      var force = $scope.twoFactor.via == 'app' ? true : false;
	      $scope.status = 'requesting token...';
	      authflow.requestToken($scope.twoFactor.blob_url, $scope.twoFactor.blob_id, force, function(tokenError, tokenResp) {
	        if (tokenError) {
	          $scope.status = 'token request failed...';
	          $scope.backendMessages.push({'backend': "2FA", 'message': tokenError.message});  
	        } else {
	          $scope.status = 'token resent!';
	        }  
	      });
	    }
	    
	    $scope.cancel2FA = function() {
	      $scope.twoFactor  = null;
	      $scope.status     = null;
	    }
	  }]);

	  /**
	   * Focus on username input only if it's empty. Otherwise focus on password field
	   * This directive will not be used anywhere else, that's why it's here.
	   */
	  module.directive('rpFocusOnEmpty', ['$timeout', function($timeout) {
	    return function($scope, element) {
	      $timeout(function(){
	        $scope.$watch(function () {return element.is(':visible')}, function(newValue) {
	          if (newValue === true && !element.val())
	            element.focus();
	        })
	      }, 200)
	    }
	  }]);
	};



	module.exports = LoginTab;


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var util     = __webpack_require__(76);
	var Tab      = __webpack_require__(63).Tab;

	var RecoverTab = function ()
	{
	  Tab.call(this);
	};

	util.inherits(RecoverTab, Tab);

	RecoverTab.prototype.tabName = 'recover';
	RecoverTab.prototype.pageMode = 'single';
	RecoverTab.prototype.parent = 'main';

	RecoverTab.prototype.generateHtml = function ()
	{
	  return __webpack_require__(66)();
	};

	RecoverTab.prototype.extraRoutes = [
	  { name: '/recover/:username' }
	];

	RecoverTab.prototype.angular = function (module) {
	  module.controller('RecoverCtrl', ['$scope', '$element', '$routeParams',
	                                  '$location', 'rpId', '$rootScope',
	                                  'rpPopup', '$timeout', 'rpTracker', 'rpAuthFlow',
	                                  function ($scope, $element, $routeParams,
	                                            $location, $id, $rootScope, 
	                                            popup, $timeout, $rpTracker, $authflow) {

	    /**
	     * User is already logged in
	     */
	    if ($id.loginStatus) {
	      $location.path('/balance');
	      return;
	    }
	    
	    var recoveredBlob;
	    
	    $scope.username      = $routeParams.username;
	    $scope.masterkey     = '';
	    $scope.mode          = 'recover';
	    $scope.submitLoading = false;
	    $scope.passwordSet   = {};
	    $scope.password1     = '';
	    $scope.password2     = '';
	    $scope.recoverError  = null;
	    $scope.passwordError = null;
	    
	    $scope.submitForm = function() {
	      
	      // Disable submit button
	      $scope.submitLoading = true;
	      
	      if ($scope.mode === 'recover') {
	        $authflow.recoverBlob($scope.username, $scope.masterkey, function (err, blob){
	          $scope.submitLoading = false;
	           
	          if (err) {
	            $rpTracker.track('Recover Blob', {
	              'Status': 'error',
	              'Message': err.message
	            });
	            
	            var message = err.message || err;
	            if (err.message == 'Invalid ECDSA signature') {
	              message = 'Please check your secret key';
	            } 
	            
	            $scope.recoverError = message;
	            return;
	          }       
	          
	          $rpTracker.track('Recover Blob', {
	            result: 'success'
	          });
	          
	          recoveredBlob       = blob;
	          $scope.username     = blob.username;
	          $scope.mode         = 'setPassword';
	          $scope.recoverError = null; //clear any existing errors
	        });
	        
	      } else if ($scope.mode === 'setPassword') {
	      
	        var options = {
	          username  : $scope.username,
	          password  : $scope.password1,
	          masterkey : $scope.masterkey,
	          blob      : recoveredBlob
	        }
	      
	        $id.changePassword(options, function(err, resp) {
	          $scope.submitLoading = false;
	          
	          if (err) {
	            $rpTracker.track('Change Password', {
	              'Status': 'error',
	              'Message': err.message
	            });
	            
	            $scope.passwordError = err.message || err;
	            return;
	          }
	          
	          $rpTracker.track('Change Password', {
	            result: 'success'
	          });
	          
	          $rootScope.recovered = true;
	          $location.path('/balance');     
	        });
	      }    
	    };   
	  }]);
	};

	module.exports = RecoverTab;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(76),
	    Tab = __webpack_require__(63).Tab;

	var BalanceTab = function ()
	{
	  Tab.call(this);
	};

	util.inherits(BalanceTab, Tab);

	BalanceTab.prototype.tabName = 'balance';
	BalanceTab.prototype.mainMenu = 'wallet';

	BalanceTab.prototype.angularDeps = Tab.prototype.angularDeps.concat(['qr']);

	BalanceTab.prototype.generateHtml = function ()
	{
	  return __webpack_require__(67)();
	};

	BalanceTab.prototype.angular = function (module)
	{
	  

	  module.controller('BalanceCtrl', ['$rootScope', 'rpId', '$filter', '$http', 'rpAppManager',
	                                     function ($scope, $id, $filter, $http, appManager)
	  {
	    if (!$id.loginStatus) return $id.goId();
	    
	    
	    // In the following, we get and watch for changes to data that is used to
	    // calculate the pie chart and aggregate balance. This data includes:
	    // -What balances the user holds
	    // -What (if any) market value in terms of XRP each balance has, according to
	    //  https://api.ripplecharts.com/api/exchangeRates
	    // -What metric the user has chosen to calculate the aggregate value in
	    
	    
	    // When the selected value metric changes, update the displayed amount.
	    
	    ($scope.selectedValueMetric = store.get('balance')) || ($scope.selectedValueMetric = "XRP");
	    
	    $scope.changeMetric = function(scope){
	      $scope.selectedValueMetric = scope.selectedValueMetric;
	      store.set('balance', $scope.selectedValueMetric);
	    };
	    
	    $scope.$watch("selectedValueMetric", function(){
	      if ($scope.selectedValueMetric && $scope.aggregateValueAsXrp) {
	        updateAggregateValueDisplayed();
	      }
	    })
	    
	    
	    // Maintain a dictionary for the value of each "currency:issuer" pair, denominated in XRP.
	    // Fetch the data from RippleCharts, and refresh it whenever any non-XRP balances change.
	    // When exchangeRates changes, update the aggregate value, and the list of available value metrics,
	    // and also check for negative balances to see if the user should be notified.
	    
	    $scope.exchangeRates || ($scope.exchangeRates = {"XRP":1});
	    
	    function updateExchangeRates() {
	      var currencies = [];
	      var hasNegative = false;
	      for (var cur in $scope.balances) {if ($scope.balances.hasOwnProperty(cur)){
	        var components = $scope.balances[cur].components;
	        for (var issuer in components) {if (components.hasOwnProperty(issuer)){
	          // While we're at it, check for negative balances:
	          hasNegative || (hasNegative = components[issuer].is_negative()); 
	          currencies.push({
	            currency: cur,
	            issuer: issuer
	          });
	        }}
	      }}
	      $scope.hasNegative = hasNegative;
	      var pairs = currencies.map(function(c){
	        return {
	          base:c,
	          counter:{currency:"XRP"}
	        }
	      });
	      if (pairs.length) {
	        $http.post("https://api.ripplecharts.com/api/exchangeRates", {pairs:pairs,last:true})
	        .success(function(response){
	          var anything = false;
	          for (var i=0; i<response.length; i++) {
	            var pair = response[i];
	            if (pair.last > 0) { // Disregard unmarketable assets
	              $scope.exchangeRates[pair.base.currency+":"+pair.base.issuer] = pair.last; 
	              anything || (anything = true);
	            }
	          }
	          if (anything) {
	            $scope.exchangeRatesNonempty || ($scope.exchangeRatesNonempty = true);
	          }
	        });
	      } else {
	        $scope.exchangeRatesNonempty || ($scope.exchangeRatesNonempty = true);
	      }
	    }

	    $scope.$on('$balancesUpdate', updateExchangeRates);

	    $scope.$watch("exchangeRates", function(){
	      if ($scope.exchangeRates) {
	        var isAmbiguous = {};
	        var okser = Object.keys($scope.exchangeRates);
	        for (var i=0; i<okser.length; i++) {
	          var cur = okser[i].split(":")[0];
	          if (!isAmbiguous[cur] || !isAmbiguous.hasOwnProperty(cur)) {
	            // (In case there's a currency called "constructor" or something)
	            for (var j=i+1; j<okser.length; j++) {
	              var cur2 = okser[j].split(":")[0];
	              if (cur === cur2) {
	                isAmbiguous[cur] = true;
	                break;
	              }
	            }
	          }
	        }
	        $scope.valueMetrics = okser.map(function(code){
	          var curIssuer = code.split(":");
	          var currencyName = $filter('rpcurrency')(ripple.Amount.from_human("0 "+curIssuer[0])); //This is really messy
	          var issuerName = $filter('rpcontactname')(curIssuer[1]);
	          return {
	            code: code,
	            text: currencyName + (isAmbiguous[curIssuer[0]] ? " ("+ issuerName +")" : "")
	          };
	        });
	        updateAggregateValueAsXrp();
	      }
	    }, true);
	    
	    
	    // Whenever the XRP balance changes, update the aggregate value, but no need to refresh exchangeRates.
	    // Update the displayed amount.
	    
	    $scope.$watch("account.Balance", updateAggregateValueAsXrp);
	    
	    function updateAggregateValueAsXrp() {
	      if ( $scope.account.Balance) {
	        var av = $scope.account.Balance / 1000000;
	        for (var cur in $scope.balances) {if ($scope.balances.hasOwnProperty(cur)){
	          var components = $scope.balances[cur].components;
	          for (var issuer in components) {if (components.hasOwnProperty(issuer)){
	            var rate = ( $scope.exchangeRates[cur+":"+issuer] || 0);
	            var sbAsXrp = components[issuer].to_number() * rate;
	            av += sbAsXrp;
	          }}
	        }}
	        $scope.aggregateValueAsXrp = av;
	        updateAggregateValueDisplayed();
	      }
	    }
	    
	    function updateAggregateValueDisplayed() {
	      $scope.aggregateValueDisplayed = $scope.aggregateValueAsXrp / $scope.exchangeRates[$scope.selectedValueMetric];
	    }
	    

	  }]);
	};

	module.exports = BalanceTab;


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(76),
	    Tab = __webpack_require__(63).Tab,
	    rewriter = __webpack_require__(55);

	var HistoryTab = function ()
	{
	  Tab.call(this);
	};

	util.inherits(HistoryTab, Tab);

	HistoryTab.prototype.tabName = 'history';
	HistoryTab.prototype.mainMenu = 'wallet';

	HistoryTab.prototype.generateHtml = function ()
	{
	  return __webpack_require__(68)();
	};

	HistoryTab.prototype.angular = function (module) {
	  module.controller('HistoryCtrl', ['$scope', 'rpId', 'rpNetwork', 'rpTracker', 'rpAppManager',
	                                     function ($scope, $id, $network, $rpTracker, appManager)
	  {
	    if (!$id.loginStatus) return $id.goId();

	    var history = [];

	    // Latest transaction
	    var latest;

	    // History collection
	    $scope.historyShow = [];

	    // History states
	    $scope.$watch('loadState.transactions',function(){
	      $scope.historyState = !$scope.loadState.transactions ? 'loading' : 'ready';
	    });

	    // Open/close states of individual history items
	    $scope.details = [];

	    //$scope.typeUsage = [];
	    //$scope.currencyUsage = [];

	    // Currencies from history
	    var historyCurrencies = [];

	    $scope.types = {
	      sent: {
	        'types': ['sent'],
	        'checked': true
	      },
	      received: {
	        'types': ['received'],
	        'checked': true
	      },
	      trusts: {
	        'types': ['trusting','trusted'],
	        'checked': true
	      },
	      trades: {
	        'types': ['offernew','exchange'],
	        'checked': true
	      },
	      orders: {
	        'types': ['offernew','offercancel','exchange'],
	        'checked': true
	      },
	      other: {
	        'types': ['accountset','failed','rippling'],
	        'checked': true
	      }
	    };

	    $scope.orderedTypes = ['sent','received','trusts','trades','orders','other'];

	    if (store.get('ripple_history_type_selections')) {
	      $scope.types = $.extend(true,$scope.types,store.get('ripple_history_type_selections'));
	    }

	    // Filters
	    if (store.get('ripple_history_filters')) {
	      $scope.filters = store.get('ripple_history_filters');
	    } else {
	      $scope.filters = {
	        'currencies_is_active': false, // we do the currency filter only if this is true, which happens when at least one currency is off
	        'currencies': {},
	        'types': ['sent','received','exchange','trusting','trusted','offernew','offercancel','rippling'],
	        'minimumAmount': 0.000001
	      };
	    }

	    var getDateRangeHistory = function(dateMin,dateMax,callback)
	    {
	      var completed = false;
	      var history = [];

	      var params = {
	        'account': $id.account,
	        'ledger_index_min': -1,
	        'limit': 200
	      };

	      var getTx = function(){
	        $network.remote.request_account_tx(params)
	        .on('success', function(data) {
	          if (data.transactions.length) {
	            for(var i=0;i<data.transactions.length;i++) {
	              var date = ripple.utils.toTimestamp(data.transactions[i].tx.date);

	              if(date < dateMin.getTime()) {
	                completed = true;
	                break;
	              }

	              if(date > dateMax.getTime())
	                continue;

	              // Push
	              var tx = rewriter.processTxn(data.transactions[i].tx, data.transactions[i].meta, $id.account);
	              if (tx) history.push(tx);
	            }

	            if (data.marker) {
	              params.marker = data.marker;
	              $scope.tx_marker = params.marker;
	            }
	            else {
	              // Received all transactions since a marker was not returned
	              completed = true;
	            }

	            if (completed)
	              callback(history);
	            else
	              getTx();
	          } else {
	            callback(history);
	          }
	        }).request();
	      };

	      getTx(0);
	    };

	    // DateRange filter form
	    $scope.submitDateRangeForm = function() {
	      $scope.dateMaxView.setDate($scope.dateMaxView.getDate() + 1); // Including last date
	      changeDateRange($scope.dateMinView,$scope.dateMaxView);
	    };

	    $scope.submitMinimumAmountForm = function() {
	      updateHistory();
	    };

	    var changeDateRange = function(dateMin,dateMax) {
	      history = [];
	      $scope.historyState = 'loading';

	      getDateRangeHistory(dateMin,dateMax,function(hist){
	        $scope.$apply(function () {
	          history = hist;
	          $scope.historyState = 'ready';
	          updateHistory();
	        })
	      })
	    };

	    // All the currencies
	    $scope.$watch('balances', function(){
	      updateCurrencies();
	    });

	    // Types filter has been changed
	    $scope.$watch('types', function(){
	      var arr = [];
	      var checked = {};
	      _.each($scope.types, function(type,index){
	        if (type.checked) {
	          arr = arr.concat(type.types);
	        }

	        checked[index] = {
	          checked: !!type.checked
	        };
	      });
	      $scope.filters.types = arr;

	      if (!store.disabled) {
	        store.set('ripple_history_type_selections', checked);
	      }
	    }, true);

	    if (!store.disabled) {
	      $scope.$watch('filters', function(){
	        store.set('ripple_history_filters', $scope.filters);
	      }, true);
	    }

	    $scope.$watch('filters.types', function(){
	      updateHistory();
	    }, true);

	    // Currency filter has been changed
	    $scope.$watch('filters.currencies', function(){
	      updateCurrencies();
	      updateHistory();
	    }, true);

	    // New transactions
	    $scope.$watchCollection('history',function(){
	      history = $scope.history;

	      updateHistory();

	      // Update currencies
	      if (history.length)
	        updateCurrencies();
	    },true);

	    // Updates the history collection
	    var updateHistory = function (){

	      //$scope.typeUsage = [];
	      //$scope.currencyUsage = [];
	      $scope.historyShow = [];

	      if (history.length) {
	        var dateMin, dateMax;

	        $scope.minLedger = 0;

	        var currencies = _.map($scope.filters.currencies,function(obj,key){return obj.checked ? key : false});
	        history.forEach(function(event)
	        {

	          // Calculate dateMin/dateMax. Used in date filter view
	          if (!$scope.dateMinView) {
	            if (!dateMin || dateMin > event.date)
	              dateMin = event.date;

	            if (!dateMax || dateMax < event.date)
	              dateMax = event.date;
	          }

	          var affectedCurrencies = _.map(event.affected_currencies, function (currencyCode) {
	            return ripple.Currency.from_json(currencyCode).to_human();
	          });

	          // Update currencies
	          historyCurrencies = _.union(historyCurrencies, affectedCurrencies); // TODO put in one large array, then union outside of foreach

	          // Calculate min ledger. Used in "load more"
	          if (!$scope.minLedger || $scope.minLedger > event.ledger_index)
	            $scope.minLedger = event.ledger_index;

	          // Type filter
	          if (event.transaction && !_.contains($scope.filters.types,event.transaction.type))
	            return;

	          // Some events don't have transactions.. this is a temporary fix for filtering offers
	          else if (!event.transaction && !_.contains($scope.filters.types,'offernew'))
	            return;

	          // Currency filter
	          if ($scope.filters.currencies_is_active && _.intersection(currencies,event.affected_currencies).length <= 0)
	            return;

	          var effects = [];
	          var isFundedTrade = false; // Partially/fully funded
	          var isCancellation = false;

	          if (event.effects) {
	            // Show effects
	            $.each(event.effects, function(){
	              var effect = this;
	              switch (effect.type) {
	                case 'offer_funded':
	                case 'offer_partially_funded':
	                case 'offer_bought':
	                  isFundedTrade = true;
	                  /* falls through */
	                case 'offer_cancelled':
	                  if (effect.type === 'offer_cancelled') {
	                    isCancellation = true;
	                    if (event.transaction && event.transaction.type === 'offercancel')
	                      return;
	                  }
	                  effects.push(effect);
	                  break;
	              }
	            });

	            event.showEffects = effects;

	            // Trade filter - remove open orders that haven't been filled/partially filled
	            if (_.contains($scope.filters.types,'exchange') && !_.contains($scope.filters.types,'offercancel')) {
	              if ((event.transaction && event.transaction.type === 'offernew' && !isFundedTrade) || isCancellation)
	                return
	            }

	            effects = [ ];

	            var amount, maxAmount;
	            var minimumAmount = $scope.filters.minimumAmount;

	            // Balance changer effects
	            $.each(event.effects, function(){
	              var effect = this;
	              switch (effect.type) {
	                case 'fee':
	                case 'balance_change':
	                case 'trust_change_balance':
	                  effects.push(effect);

	                  // Minimum amount filter
	                  if (effect.type === 'balance_change' || effect.type === 'trust_change_balance') {
	                    amount = effect.amount.abs().is_native()
	                      ? effect.amount.abs().to_number() / 1000000
	                      : effect.amount.abs().to_number();

	                    if (!maxAmount || amount > maxAmount)
	                      maxAmount = amount;
	                    }
	                  break;
	              }
	            });

	            // Minimum amount filter
	            if (maxAmount && minimumAmount > maxAmount)
	              return;

	            event.balanceEffects = effects;
	          }

	          // Don't show sequence update events
	          if (event.effects && 1 === event.effects.length && event.effects[0].type == 'fee')
	            return;

	          // Push events to history collection
	          $scope.historyShow.push(event);

	          // Type and currency usages
	          // TODO offers/trusts
	          //if (event.transaction)
	          //  $scope.typeUsage[event.transaction.type] = $scope.typeUsage[event.transaction.type] ? $scope.typeUsage[event.transaction.type]+1 : 1;

	          //event.affected_currencies.forEach(function(currency){
	          //  $scope.currencyUsage[currency] = $scope.currencyUsage[currency]? $scope.currencyUsage[currency]+1 : 1;
	          //});
	        });

	        if ($scope.historyShow.length && !$scope.dateMinView) {
	          setValidDateOnScopeOrNullify('dateMinView', dateMin);
	          setValidDateOnScopeOrNullify('dateMaxView', dateMax);
	        }
	      }
	    };

	    // Update the currency list
	    var updateCurrencies = function (){
	      if (!$.isEmptyObject($scope.balances)) {
	        var currencies = _.union(
	          ['XRP'],
	          _.map($scope.balances,function(obj,key){return obj.total.currency().to_human();}),
	          historyCurrencies
	        );

	        var objCurrencies = {};

	        var firstProcess = $.isEmptyObject($scope.filters.currencies);

	        $scope.filters.currencies_is_active = false;

	        _.each(currencies, function(currency){
	          var checked = ($scope.filters.currencies[currency] && $scope.filters.currencies[currency].checked) || firstProcess;
	          objCurrencies[currency] = {'checked':checked};

	          if (!checked)
	            $scope.filters.currencies_is_active = true;
	        });

	        $scope.filters.currencies = objCurrencies;
	      }
	    };

	    var setValidDateOnScopeOrNullify = function(key, value) {
	      if (isNaN(value) || value == null) {
	        $scope[key] = null;
	      } else {
	        $scope[key] = new Date(value);
	      }
	    };

	    $scope.loadMore = function () {
	      var dateMin = $scope.dateMinView;
	      var dateMax = $scope.dateMaxView;

	      $scope.historyState = 'loading';

	      var limit = 100; // TODO why 100?

	      var params = {
	        account: $id.account,
	        ledger_index_min: -1,
	        limit: limit,
	        marker: $scope.tx_marker
	      };

	      $network.remote.request_account_tx(params)
	      .on('success', function(data) {
	        $scope.$apply(function () {
	          if (data.transactions.length < limit) {

	          }

	          $scope.tx_marker = data.marker;

	          if (data.transactions) {
	            var transactions = [];

	            data.transactions.forEach(function (e) {
	              var tx = rewriter.processTxn(e.tx, e.meta, $id.account);
	              if (tx) {
	                var date = ripple.utils.toTimestamp(tx.date);

	                if (dateMin && dateMax) {
	                  if (date < dateMin.getTime() || date > dateMax.getTime())
	                    return;
	                } else if (dateMax && date > dateMax.getTime()) {
	                  return;
	                } else if (dateMin && date < dateMin.getTime()) {
	                  return;
	                }
	                transactions.push(tx);
	              }
	            });

	            var newHistory = _.uniq(history.concat(transactions),false,function(ev){return ev.hash});

	            $scope.historyState = (history.length === newHistory.length) ? 'full' : 'ready';
	            history = newHistory;
	            updateHistory();
	          }
	        });
	      }).request();
	    }
	  }]);
	};

	module.exports = HistoryTab;


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(76);
	var Tab = __webpack_require__(63).Tab;

	var AccountTab = function ()
	{
	  Tab.call(this);
	};

	util.inherits(AccountTab, Tab);

	AccountTab.prototype.tabName = 'account';
	AccountTab.prototype.mainMenu = 'account';

	AccountTab.prototype.generateHtml = function ()
	{
	  return __webpack_require__(69)();
	};

	AccountTab.prototype.angular = function(module)
	{
	  module.controller('AccountCtrl', ['$scope', '$timeout', 'rpId', 'rpKeychain',
	    function ($scope, $timeout, $id, keychain)
	    {
	      if (!$id.loginStatus) return $id.goId();

	      $scope.infoPage = 'public';


	      $scope.rename = function() {
	        $scope.loading = true;
	        $scope.error = false;

	        // Get the master key
	        keychain.getSecret($id.account, $id.username, $scope.password,
	          function (err, masterkey) {
	            if (err) {
	              console.log("client: account tab: error while " +
	                "unlocking wallet: ", err);

	              $scope.error = 'wrongpassword';
	              $scope.loading = false;
	              return;
	            }

	            // Rename
	            $id.rename({
	              new_username: $scope.username,
	              password: $scope.password,
	              masterkey: masterkey
	            }, function(err){
	              if (err) {
	                console.log('client: account tab: error while ' +
	                  'renaming account: ', err);
	                $scope.error = true;
	                $scope.loading = false;
	                return;
	              }

	              // Re-login
	              // TODO implement refresh/relogin in ID.
	              $id.login({
	                username: $scope.username,
	                password: $scope.password
	              }, function (err) {
	                if (err) {
	                  console.log('client: account tab: error while ' +
	                    'logging user in: ', err);
	                  $scope.error = 'cantlogin';
	                  $scope.loading = false;
	                  return;
	                }

	                $scope.success = true;
	                reset();
	              });
	            });
	          }
	        );
	      };


	      var reset = function() {
	        $scope.openForm = false;
	        $scope.username = '';
	        $scope.password = '';
	        $scope.showPassword = true;
	        $scope.loading = false;
	        $scope.error = false;

	        if ($scope.renameForm) {
	          $scope.renameForm.$setPristine(true);
	        }

	      };

	      reset();
	      $scope.success = false;
	    }]
	  );
	};

	module.exports = AccountTab;


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(76);
	var Tab  = __webpack_require__(63).Tab;

	var SecurityTab = function ()
	{
	  Tab.call(this);
	};

	util.inherits(SecurityTab, Tab);

	SecurityTab.prototype.tabName = 'security';
	SecurityTab.prototype.mainMenu = 'security';

	SecurityTab.prototype.generateHtml = function ()
	{
	  return __webpack_require__(70)();
	};

	SecurityTab.prototype.angular = function (module) {
	  module.controller('SecurityCtrl', ['$scope', 'rpId', 'rpOldBlob', 'rpTracker',
	                                     'rpKeychain', '$timeout', 'rpAuthFlow', 'rpPopup',
	                                     function ($scope, $id, $blob, $rpTracker,
	                                               keychain, $timeout, authflow, popup)
	  {
	    if (!$id.loginStatus) return $id.goId();

	    $scope.settingsPage = 'security';
	    
	    $scope.showComponent = [];


	    $scope.isUnlocked = true; //hiding the dialog for now
	    //$scope.isUnlocked = keychain.isUnlocked($id.account);
	    $scope.loading2FA      = false;
	    $scope.loaded2FA       = false;
	    $scope.errorLoading2FA = false;
	    $scope.requirePasswordChanged = false;
	    
	    $scope.$on('$blobUpdate', onBlobUpdate);
	    onBlobUpdate();

	    $scope.security = {};

	    function onBlobUpdate()
	    {
	      if ("function" === typeof $scope.userBlob.encrypt) {
	        $scope.enc = $scope.userBlob.encrypt();
	      }
	      

	      $scope.requirePassword = !$scope.userBlob.data.persistUnlock;
	      
	      if (!$scope.loaded2FA && "function" === typeof $scope.userBlob.get2FA) {
	        $scope.loading2FA      = true;
	        $scope.errorLoading2FA = false;
	        $scope.userBlob.get2FA(function(err, resp) {
	          $scope.$apply(function(){
	            $scope.loading2FA = false;
	            if (err) {
	              $scope.errorLoading2FA = true;
	              return;
	            }
	  
	            $scope.loaded2FA          = true;
	            $scope.enabled2FA         = resp.enabled;
	            $scope.currentPhone       = resp.phone;
	            $scope.currentCountryCode = resp.country_code;
	          });
	        });
	      }   
	    }

	    $scope.restoreSession = function() {

	      if (!$scope.sessionPassword) {
	        $scope.unlockError = true;
	        return;
	      }

	      $scope.isConfirming = true;
	      $scope.unlockError  = null;

	      keychain.getSecret($id.account, $id.username, $scope.sessionPassword, function(err, secret) {
	        $scope.isConfirming = false;
	        $scope.sessionPassword = '';
	        
	        if (err) {
	          $scope.unlockError = err;
	          return;
	        }

	        $scope.isUnlocked = keychain.isUnlocked($id.account);
	      });

	    };


	    $scope.unmaskSecret = function () {
	      keychain.requestSecret($id.account, $id.username, 'showSecret', function (err, secret) {
	        if (err) {
	          // XXX Handle error
	          return;
	        }

	        $scope.security.master_seed = secret;
	      });
	    };


	    $scope.setPasswordProtection = function () {
	      $scope.editUnlock = false;
	      
	      //ignore it if we are not going to change anything
	      if (!$scope.requirePasswordChanged) return;
	      $scope.requirePasswordChanged = false;
	      $scope.requirePassword        = !$scope.requirePassword;
	      
	      keychain.setPasswordProtection($scope.requirePassword, function(err, resp){
	        if (err) {
	          console.log(err);
	          $scope.requirePassword = !$scope.requirePassword;
	          //TODO: report errors to user
	        }
	      });
	    };

	    $scope.cancelUnlockOptions = function () {
	      $scope.editUnlock = false;
	    };

	    $scope.changePassword = function() {
	      $scope.loading = true;
	      $scope.error = false;

	      // Get the master key
	      keychain.getSecret($id.account, $id.username, $scope.password,
	          function (err, masterkey) {
	            if (err) {
	              console.log("client: account tab: error while " +
	                  "unlocking wallet: ", err);

	              $scope.error = 'wrongpassword';
	              $scope.loading = false;
	              return;
	            }

	            // Change password
	            $id.changePassword({
	              username: $id.username,
	              password: $scope.password1,
	              masterkey: masterkey,
	              blob: $scope.userBlob
	            }, function(err){
	              if (err) {
	                console.log('client: account tab: error while ' +
	                    'changing the account password: ', err);
	                $scope.error = true;
	                $scope.loading = false;
	                return;
	              }

	              $scope.success = true;
	              reset();
	            });
	          }
	      );
	    };

	    $scope.open2FA = function() {  
	      $scope.mode2FA        = '';
	      $scope.loading        = false;
	      $scope.error2FA       = false;
	      $scope.disableSuccess = false;
	      $scope.phoneNumber    = $scope.currentPhone;
	      $scope.countryCode    = $scope.currentCountryCode;
	      window.Authy.UI.instance(true, $scope.countryCode); //enables the authy dropdown 
	    };

	    $scope.savePhone = function() {
	      $scope.mode2FA     = 'savePhone';
	      $scope.error2FA    = false;
	      $scope.savingPhone = true;

	      keychain.requestSecret($id.account, $id.username, function(err, secret) {
	        if (err) {
	          $scope.mode2FA = '';
	          return;
	        }
	        
	        var options = {
	          masterkey    : secret,
	          phone        : $scope.phoneNumber,
	          country_code : $scope.countryCode
	        };

	        $scope.userBlob.set2FA(options, function(err, resp) {
	          $scope.$apply(function(){
	            $scope.mode2FA = '';
	            if (err) {
	              console.log(err, resp);
	              $scope.error2FA    = true;
	              $scope.savingPhone = false;
	              popup.close();
	            } else {

	              $scope.currentPhone       = options.phone;
	              $scope.currentCountryCode = options.country_code;

	              //request verification token
	              requestToken(false, function(err, resp) {
	                //TODO: handle error
	                
	                $scope.savingPhone = false;
	                $scope.mode2FA     = 'verifyPhone';
	                popup.close();
	              });
	            }
	          });
	        });
	      });
	    };

	    function requestToken (force, callback) {

	      authflow.requestToken($scope.userBlob.url, $scope.userBlob.id, force, function(tokenError, tokenResp) {
	        if (tokenError) {
	          $scope.error2FA = true;
	        } else {
	          $scope.via = tokenResp.via;
	        }

	        callback(tokenError, tokenResp);
	      });
	    }

	    $scope.requestToken = function () {
	      var force = $scope.via === 'app' ? true : false;
	      
	      $scope.isRequesting = true;
	      requestToken(force, function(err, resp) {
	        $scope.isRequesting = false;
	        //TODO: present message of resend success or failure
	      });
	    }


	    $scope.enable2FA = function() {

	      $scope.isVerifying  = true;
	      $scope.invalidToken = false;

	      var options = {
	        url         : $scope.userBlob.url,
	        id          : $scope.userBlob.id,
	        token       : $scope.verifyToken,
	        remember_me : false
	      };

	      authflow.verifyToken(options, function(err, resp){

	        if (err) {
	          $scope.invalidToken = true;
	          $scope.isVerifying  = false;
	          return;
	        }

	        keychain.requestSecret($id.account, $id.username, function(err, secret) {

	          if (err) {
	            $scope.mode2FA     = '';
	            $scope.isVerifying = false;
	            return;
	          }

	          var options = {
	            masterkey : secret,
	            enabled   : true
	          };

	          $scope.userBlob.set2FA(options, function(err, resp) {
	            $scope.$apply(function() {
	              $scope.isVerifying = false;
	              $scope.mode2FA     = '';

	              if (err) {
	                $scope.error2FA = true;
	              } else {

	                //remove old device ID so that
	                //next login will require 2FA
	                store.remove('device_id');
	                $scope.enabled2FA    = true;
	                $scope.enableSuccess = true;
	              }
	            });
	          });
	        });
	      });
	    };

	    $scope.disable2FA = function() {
	      $scope.mode2FA       = 'disable';
	      $scope.error2FA      = false;
	      $scope.enableSuccess = false;

	      keychain.requestSecret($id.account, $id.username, function(err, secret) {
	        if (err) {
	          $scope.mode2FA = '';
	          return;
	        }

	        var options = {
	          masterkey : secret,
	          enabled   : false
	        };

	        $scope.userBlob.set2FA(options, function(err, resp) {
	          $scope.$apply(function(){
	            $scope.mode2FA = '';
	            if (err) {
	              $scope.error2FA   = true;
	            } else {
	              $scope.enabled2FA     = false;
	              $scope.disableSuccess = true;
	            }
	          });
	        });
	      });
	    };

	    $scope.cancel2FA = function () {
	      $scope.mode2FA = '';
	      $scope.invalidToken = false;
	      $scope.error2FA     = false;
	    };


	    var reset = function() {

	      $scope.openFormPassword = false;
	      $scope.password1 = '';
	      $scope.password2 = '';
	      $scope.passwordSet = {};
	      $scope.loading = false;
	      $scope.error = false;

	      if ($scope.changeForm) {
	        $scope.changeForm.$setPristine(true);
	      }
	  };

	  reset();
	  $scope.success = false;

	  }]);
	};

	module.exports = SecurityTab;


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(76);
	var Tab = __webpack_require__(63).Tab;

	var TxTab = function ()
	{
	  Tab.call(this);
	};

	util.inherits(TxTab, Tab);

	TxTab.prototype.tabName = 'tx';

	TxTab.prototype.generateHtml = function ()
	{
	  return __webpack_require__(71)();
	};

	TxTab.prototype.angular = function (module)
	{
	  module.controller('TxCtrl', ['$scope', 'rpNetwork', '$routeParams',
	                               function ($scope, net, $routeParams)
	  {
	    $scope.state = 'loading';
	    $scope.transaction = {
	      hash: $routeParams.id
	    };

	    function loadTx() {
	      // XXX: Dirty, dirty. But it's going to change soon anyway.
	      var request = net.remote.request_ledger_hash();
	      request.message.command = 'tx';
	      request.message.transaction = $routeParams.id;
	      request.on('success', function (res) {
	        $scope.$apply(function () {
	          $scope.state = 'loaded';
	          // XXX This is for the upcoming tx RPC call format change.
	          var tx = res.tx ? res.tx : res;
	          _.extend($scope.transaction, res);

	          if (tx.TransactionType === "Payment") {
	            var sender = tx.Account;
	            var affectedNode;
	            var difference;
	            var cur;
	            var i;

	            if (tx.Amount.currency) {//It's not XRP
	              /* Find the metadata node with entry type == "RippleState" 
	              and either HighLimit.issuer == [sender's account] or 
	              LowLimit.issuer == [sender's account] and 
	              Balance.currency == [currency of SendMax || Amount]
	              */
	              if (tx.meta.AffectedNodes) {
	                for (i=0; i<tx.meta.AffectedNodes.length; i++) {
	                  affectedNode = tx.meta.AffectedNodes[i];
	                  if (affectedNode.ModifiedNode && affectedNode.ModifiedNode.LedgerEntryType === "RippleState" && 
	                    (affectedNode.ModifiedNode.FinalFields.HighLimit.issuer === sender ||
	                      affectedNode.ModifiedNode.FinalFields.LowLimit.issuer === sender) &&
	                    affectedNode.ModifiedNode.FinalFields.Balance.currency === tx.SendMax.currency
	                    ) {
	                    break;
	                  } else {
	                    affectedNode = null;
	                  }
	                }
	              }

	              // Calculate the difference before/after. If HighLimit.issuer == [sender's account] negate it.
	              if (affectedNode) {
	                difference = affectedNode.ModifiedNode.PreviousFields.Balance.value - affectedNode.ModifiedNode.FinalFields.Balance.value;
	                if (affectedNode.ModifiedNode.FinalFields.HighLimit.issuer === sender) {
	                  difference *= -1;
	                }
	                cur = affectedNode.ModifiedNode.FinalFields.Balance.currency;
	              }

	            } else { //It's XRP
	              // Find the metadata node with entry type == "AccountRoot" and Account == [sender's account].
	              if (tx.meta.AffectedNodes) {
	                for (i=0; i<tx.meta.AffectedNodes.length; i++) {
	                  affectedNode = tx.meta.AffectedNodes[i];
	                  if (affectedNode.ModifiedNode && affectedNode.ModifiedNode.LedgerEntryType === "AccountRoot" && 
	                    affectedNode.ModifiedNode.FinalFields.Account === sender) {
	                    break;
	                  } else {
	                    affectedNode = null;
	                  }
	                }
	              }

	              // Calculate the difference minus the fee
	              if (affectedNode) {
	                difference = affectedNode.ModifiedNode.PreviousFields.Balance - affectedNode.ModifiedNode.FinalFields.Balance - tx.Fee;
	              }
	            }
	            var amountSent;
	            if (cur) {
	              amountSent = {value: String(difference), currency:cur};
	            } else {
	              amountSent = difference;
	            }
	            $scope.amountSent = amountSent;
	          }
	        });
	      });
	      request.on('error', function (res) {
	        $scope.$apply(function () {
	          $scope.state = 'error';
	          console.log(res);
	        });
	      });
	      request.request();
	    }

	    if (net.connected) loadTx();
	    else var removeListener = $scope.$on('$netConnected', function () {
	      removeListener();
	      loadTx();
	    });
	  }]);
	};

	module.exports = TxTab;


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(76),
	    Tab = __webpack_require__(63).Tab;

	var FundTab = function ()
	{
	  Tab.call(this);
	};

	util.inherits(FundTab, Tab);

	FundTab.prototype.tabName = 'fund';
	FundTab.prototype.mainMenu = 'fund';

	FundTab.prototype.angularDeps = Tab.prototype.angularDeps.concat(['qr']);

	FundTab.prototype.generateHtml = function ()
	{
	  return __webpack_require__(72)();
	};

	FundTab.prototype.extraRoutes = [
	  { name: '/fund/:currency' }
	];

	FundTab.prototype.angular = function (module)
	{
	  module.controller('FundCtrl', ['$rootScope', 'rpId', 'rpAppManager', 'rpTracker', '$routeParams',
	                                     function ($scope, $id, appManager, rpTracker, $routeParams)
	  {
	    if (!$routeParams.currency) {
	      $routeParams.currency = 'clp'
	    }

	    $scope.accountLines = {};
	    $scope.showComponent = [];

	    if (!$id.loginStatus) return $id.goId();

	    $scope.openPopup = function () {
	      $scope.emailError = false;
	      rpTracker.track('B2R Show Connect');
	    };

	    // B2R Signup
	    $scope.B2RSignup = function () {
	      var fields = {};

	      $scope.loading = true;

	      fields.rippleAddress = $id.account;

	      fields.email = $scope.userBlob.data.email;

	      $scope.B2RApp.findProfile('account').signup(fields,function(err, response){
	        if (err) {
	          console.log('Error',err);
	          $scope.emailError = true;
	          $scope.loading = false;

	          rpTracker.track('B2R SignUp', {
	            result: 'failed',
	            message: err.message
	          });

	          return;
	        }

	        $scope.B2RApp.refresh();

	        $scope.B2RSignupResponse = response;

	        rpTracker.track('B2R SignUp', {
	          result: 'success'
	        });
	      });

	      $scope.B2R.progress = true;

	      rpTracker.track('B2R Shared Email');
	    };

	  }]);
	};

	module.exports = FundTab;


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(76),
	    Tab = __webpack_require__(63).Tab;

	var WithdrawTab = function ()
	{
	  Tab.call(this);
	};

	util.inherits(WithdrawTab, Tab);

	WithdrawTab.prototype.tabName = 'withdraw';
	WithdrawTab.prototype.mainMenu = 'withdraw';

	WithdrawTab.prototype.angularDeps = Tab.prototype.angularDeps.concat(['qr']);

	WithdrawTab.prototype.generateHtml = function ()
	{
	  return __webpack_require__(73)();
	};

	WithdrawTab.prototype.extraRoutes = [
	    { name: '/withdraw/:currency' }
	];


	WithdrawTab.prototype.angular = function (module)
	{
	    module.controller('WithdrawCtrl', ['$rootScope', 'rpId', 'rpAppManager', 'rpTracker', '$routeParams',
	                                       function ($scope, $id, appManager, rpTracker, $routeParams)
	  {
	    if (!$routeParams.currency) {
	      $routeParams.currency = 'dnx'
	    }

	    if (!$id.loginStatus) return $id.goId();



	  }]);
	};

	module.exports = WithdrawTab;


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(76);
	var Tab = __webpack_require__(63).Tab;

	var EulaTab = function ()
	{
	  Tab.call(this);
	};

	util.inherits(EulaTab, Tab);

	EulaTab.prototype.tabName = 'eula';
	EulaTab.prototype.pageMode = 'single';
	EulaTab.prototype.parent = 'main';

	EulaTab.prototype.generateHtml = function ()
	{
	  return __webpack_require__(74)();
	};

	EulaTab.prototype.angular = function (module) {
	  module.controller('EulaCtrl', ['$scope', '$element',
	                                  function ($scope, $element)
	  {

	    angular.element('nav').hide();

	  }]);

	};



	module.exports = EulaTab;


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(76);
	var Tab = __webpack_require__(63).Tab;

	var PrivacyTab = function ()
	{
	  Tab.call(this);
	};

	util.inherits(PrivacyTab, Tab);

	PrivacyTab.prototype.tabName = 'privacy';
	PrivacyTab.prototype.pageMode = 'single';
	PrivacyTab.prototype.parent = 'main';

	PrivacyTab.prototype.generateHtml = function ()
	{
	  return __webpack_require__(75)();
	};

	PrivacyTab.prototype.angular = function (module) {
	  module.controller('PrivacyCtrl', ['$scope', '$element',
	                                  function ($scope, $element)
	  {

	    angular.element('nav').hide();

	  }]);

	};



	module.exports = PrivacyTab;


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	
	var Base58Utils = (function () {
	  var alphabets = {
	    'ripple':  "rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz",
	    'bitcoin': "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
	  };

	  var SHA256  = function (bytes) {
	    return sjcl.codec.bytes.fromBits(sjcl.hash.sha256.hash(sjcl.codec.bytes.toBits(bytes)));
	  };

	  return {
	    // --> input: big-endian array of bytes.
	    // <-- string at least as long as input.
	    encode_base: function (input, alphabetName) {
	      var alphabet = alphabets[alphabetName || 'ripple'],
	          base     = new sjcl.bn(alphabet.length),
	          bi       = sjcl.bn.fromBits(sjcl.codec.bytes.toBits(input)),
	          buffer   = [];

	      while (bi.greaterEquals(base)) {
	        var mod = bi.mod(base);
	        buffer.push(alphabet[mod.limbs[0]]);
	        bi = bi.div(base);
	      }
	      buffer.push(alphabet[bi.limbs[0]]);

	      // Convert leading zeros too.
	      for (var i = 0; i != input.length && !input[i]; i += 1) {
	        buffer.push(alphabet[0]);
	      }

	      return buffer.reverse().join("");
	    },

	    // --> input: String
	    // <-- array of bytes or undefined.
	    decode_base: function (input, alphabetName) {
	      var alphabet = alphabets[alphabetName || 'ripple'],
	          base     = new sjcl.bn(alphabet.length),
	          bi       = new sjcl.bn(0);

	      var i;
	      while (i != input.length && input[i] === alphabet[0]) {
	        i += 1;
	      }

	      for (i = 0; i != input.length; i += 1) {
	        var v = alphabet.indexOf(input[i]);

	        if (v < 0) {
	          return null;
	        }

	        bi = bi.mul(base).addM(v);
	      }

	      var bytes = sjcl.codec.bytes.fromBits(bi.toBits()).reverse();

	      // Remove leading zeros
	      while(bytes[bytes.length-1] === 0) {
	        bytes.pop();
	      }

	      // Add the right number of leading zeros
	      for (i = 0; input[i] === alphabet[0]; i++) {
	        bytes.push(0);
	      }

	      bytes.reverse();

	      return bytes;
	    },

	    // --> input: Array
	    // <-- String
	    encode_base_check: function (version, input, alphabet) {
	      var buffer  = [].concat(version, input);
	      var check   = SHA256(SHA256(buffer)).slice(0, 4);
	      return Base58Utils.encode_base([].concat(buffer, check), alphabet);
	    },

	    // --> input : String
	    // <-- NaN || BigInteger
	    decode_base_check: function (version, input, alphabet) {
	      var buffer = Base58Utils.decode_base(input, alphabet);

	      if (!buffer || buffer[0] !== version || buffer.length < 5) {
	        return NaN;
	      }

	      var computed = SHA256(SHA256(buffer.slice(0, -4))).slice(0, 4),
	          checksum = buffer.slice(-4);

	      var i;
	      for (i = 0; i != 4; i += 1)
	        if (computed[i] !== checksum[i])
	          return NaN;

	      return buffer.slice(1, -4);
	    }
	  };
	})();

	module.exports = Base58Utils;


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	// returns the raw address after removing any parameters 
	exports.stripRippleAddress = function (addr)
	{
	  if(typeof(addr)=='string')
	  {
	    var index=addr.indexOf("?");
	    if(index>=0)
	    {
	      return(addr.slice(0,index));
	    }
	  }
	  return(addr);
	}
	//returns the destination tag of an address if there is one 
	exports.getDestTagFromAddress = function (addr)
	{
	  var index=addr.indexOf("?");
	  if(index>=0)
	  {
	    addr=addr.slice(index,addr.length);
	    index=addr.indexOf("dt=");
	    if(index>=0)
	    {
	      addr=addr.slice(index+3,addr.length);
	      index=addr.indexOf("&");
	      if(index>0) return( addr.slice(0,index) );
	      else return(addr);
	    }
	    index=addr.indexOf("d=");
	    if(index>=0)
	    {
	      addr=addr.slice(index+2,addr.length);
	      index=addr.indexOf("&");
	      if(index>0) return( addr.slice(0,index) );
	      else return(addr);
	    }
	  }
	  return(undefined);
	}

	exports.removeClassPrefix = function (el, group)
	{
	  var $el = $(el);
	  var classes = $el.attr("class");

	  if (!classes || !classes.length) return;

	  classes = classes.split(" ").map(function(item) {
	    return item.indexOf(group) === 0 ? "" : item;
	  });
	  $el.attr("class", classes.join(" "));
	};

	/**
	 * Error handler for jQuery.ajax requests.
	 *
	 * @example
	 *   $.get('http://acme.com/')
	 *    .success(...)
	 *    .error(webutil.getAjaxErrorHandler(callback, "Acme GET"));
	 */
	exports.getAjaxErrorHandler = function (callback, context)
	{
	  return function (request, type, errorThrown)
	  {
	    switch (type) {
	      case 'timeout':
	        message = "The request timed out.";
	        break;
	      case 'notmodified':
	        message = "The request was not modified but was not retrieved from the cache.";
	        break;
	      case 'parsererror':
	        message = "XML/Json format is bad.";
	        break;
	      default:
	        message = "HTTP Error (" + request.status + " " + request.statusText + ").";
	    }
	    callback(new Error(message));
	  };
	};

	exports.scrollToTop = function ()
	{
	  $("html, body").animate({ scrollTop: 0 }, "fast");
	};

	exports.findIssuer= function(lines, currency)
	{
	  var maxIssuer=null;
	  var maxLimit=0;

	  for (var n in lines) {
	    if (lines.hasOwnProperty(n)) {
	      if (lines[n].currency === currency) {
	        var limit = +lines[n].limit.to_text();
	        if (limit > maxLimit) {
	          maxLimit = limit;
	          maxIssuer = lines[n].account;
	        }
	      }
	    }
	  }
	  return maxIssuer;
	}

	exports.getContact = function (contacts,value)
	{
	  for (var i=0;i<contacts.length;i++) {
	    if (contacts[i].name === value || contacts[i].address === value) {
	      return contacts[i];
	    }
	  }

	  return false;
	};

	/**
	 * Given an address, return the contact name.
	 */
	exports.isContact = function (contacts, address) {
	  try {
	    for (var i = 0, l = contacts.length; i < l; i++) {
	      if (contacts[i].address === address) {
	        return contacts[i].name;
	      }
	    }
	  } catch (e) {}
	};

	/**
	 * Return the address of a contact.
	 *
	 * Pass in an address or a contact name and get an address back.
	 */
	exports.resolveContact = function (contacts, value)
	{
	  for (var i = 0, l = contacts.length; i < l; i++) {
	    if (contacts[i].name === value) {
	      return contacts[i].address;
	    }
	  }

	  if (ripple.UInt160.is_valid(value)) {
	    return ripple.UInt160.json_rewrite(value);
	  }

	  return '';
	};

	/**
	 * Given an address, return the contact name.
	 *
	 * If a contact is not found with the given address, simply return the address
	 * again.
	 */
	exports.unresolveContact = function (contacts, address)
	{
	  var contact;
	  return (contact = exports.isContact(contacts, address)) ? contact : address;
	};

	/**
	 * Creates a combobox query function out of a contacts list.
	 *
	 * @param options {array} An array of select options like {name: '', value: ''}.
	 */
	exports.queryFromContacts = function (contacts)
	{
	  return exports.queryFromOptions(
	    _.map(contacts, function (entry) {
	      return {
	        name: entry.name,
	        additional: entry.view || entry.address
	      }
	    })
	  );
	};

	/**
	 * Creates a combobox query function out of a select options array.
	 *
	 * @param options {array} An array of select options like {name: '', value: ''}.
	 */
	exports.queryFromOptions = function (options)
	{
	  var opts = _.map(options, function (entry) {
	    if ("object" === typeof entry || "string" === typeof entry ) {
	      return entry;
	    } else {
	      return null;
	    }
	  });
	  return exports.queryFromArray(opts);
	};

	exports.queryFromOptionsIncludingKeys = function (options)
	{
	  var opts = _.map(options, function (entry) {
	    if ("object" === typeof entry &&
	        entry.value && "string" === typeof entry.value && entry.name && "string" === typeof entry.name)
	    {
	      return entry.value + " - " + entry.name;
	    } else if ("object" === typeof entry || "string" === typeof entry) {
	      return entry;
	    } else {
	      return null;
	    }
	  });

	  return exports.queryFromArray(opts);
	};

	/**
	 * Creates a combobox query function out of a plain array of strings.
	 *
	 * @param options {array} An array of options, e.g. ['First choice', '2nd']
	 */
	exports.queryFromArray = function (options)
	{
	  return function (match, re) {
	    if (re instanceof RegExp) {
	      return options.filter(function (item) {
	        return "string" === typeof item
	          ? item.match(re)
	          : (item.name ? item.name.match(re) : false);
	      });
	    } else return options;
	  };
	};

	/**
	 * Escapes a string for use as a literal inside of a regular expression.
	 *
	 * From: http://stackoverflow.com/questions/3446170
	 */
	exports.escapeRegExp = function (str)
	{
	  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
	};

	/**
	 * Regex check if the string is a valid ripple name
	 *
	 * @param str
	 */
	exports.isRippleName = function (str)
	{
	  var nameRegex = /^~[a-zA-Z0-9]([\-]?[a-zA-Z0-9]){0,19}$/;

	  return nameRegex.test(str);
	};

	/**
	 * Convert base64 encoded data into base64url encoded data.
	 *
	 * @param {String} base64 Data
	 */
	exports.base64ToBase64Url = function (encodedData) {
	  return encodedData.replace(/\+/g, '-').replace(/\//g, '_').replace(/[=]+$/, '');
	};

	/**
	 * Convert base64url encoded data into base64 encoded data.
	 *
	 * @param {String} base64 Data
	 */
	exports.base64UrlToBase64 = function (encodedData) {
	  encodedData = encodedData.replace(/-/g, '+').replace(/_/g, '/');
	  while (encodedData.length % 4) {
	    encodedData += '=';
	  }
	  return encodedData;
	};


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Print an exception for debug purposes.
	 *
	 * Includes some logic to try and log a stack in various browsers.
	 */
	exports.exception = function (exception) {
	  console.log("function" === typeof exception.getStack ? exception.getStack() : exception.stack);
	};



/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(80);

	module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
	attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
	var buf = [];
	with (locals || {}) {
	var interp;
	buf.push('<div rp-snapper="rp-snapper" class="mobile-nav"><a href="#/balance" ng-class="{active: $route.current.tabName == \'balance\'}" class="wallet"><span class="nav-icon nav-icon-wallet"></span><span>Balance</span></a><a href="#/history" ng-class="{active: $route.current.tabName == \'history\'}" class="sub">Historial</a><a href="#/withdraw" ng-class="{active: $route.current.tabName == \'withdraw\'}" class="sub">Retirar</a><a href="#/account" ng-class="{active: $route.current.tabName == \'account\'}" class="advanced"><img src="img/profile-gray.png"/><span>Cuenta</span></a><a href="#/security" ng-class="{active: $route.current.tabName == \'security\'}" class="advanced"><img src="img/settings-gray.png"/><span>Configuración</span></a><a href="#" ng-click="logout()" class="advanced"><img src="img/logout-gray.png"/><span>Salir</span></a></div><!-- Wrapper--><div id="wrapper"><!-- Header--><header><h1 ng-show="[\'t-login\',\'t-recover\',\'t-register\',\'t-migrate\'].indexOf($route.current.tabClass) !== -1">Bienvenido a {{productName}} la cuenta móvil para el pago de servicios de transporte</h1>');
	var __val__ = __webpack_require__(78)()
	buf.push(null == __val__ ? "" : __val__);
	buf.push('</header><div class="container"><!-- Main--><div role="main" id="{{$route.current.tabClass}}" ng-view="ng-view" class="row main"></div><!-- Footer--><footer class="row"><div class="col-xs-12 col-sm-1"><a href="http://dinex.cl" target="_blank">www.dinex.cl</a></div><!--.col-xs-12.col-sm-9.right-links<a href="http://ripple.com/terms" target="_blank">Condiciones de servicio (actualizar url)</a><a href="https://support.ripplelabs.com" target="_blank">Soporte (actualizar url)</a><a href="https://ripplelabs.atlassian.net/browse/WC" target="_blank">Reporte de errores (actualizar url)</a><a href="#/lang/en">English</a>--></footer></div></div>');
	}
	return buf.join("");
	}

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var pairs = __webpack_require__(58);

	/**
	 * Calculate executed order price
	 *
	 * @param effect
	 * @returns {*}
	 */
	var getPrice = function(effect, referenceDate){
	  var g = effect.got ? effect.got : effect.gets;
	  var p = effect.paid ? effect.paid : effect.pays;
	  var price;

	  if (!p.is_zero() && !g.is_zero()) {
	    _.find(pairs, function(pair){
	      if (pair.name == g.currency().to_human() + '/' + p.currency().to_human()) {
	        price = p.ratio_human(g, {reference_date: referenceDate});
	      }
	    });

	    if (!price) {
	      price = g.ratio_human(p, {reference_date: referenceDate});
	    }
	  }

	  return price || 0;
	};

	/**
	 * Determine if the transaction is a "rippling" transaction based on effects
	 *
	 * @param effects
	 */
	var isRippling = function(effects){
	  if (
	    effects
	    && effects.length
	    && 2 === effects.length
	    && 'trust_change_balance' == effects[0].type
	    && 'trust_change_balance' == effects[1].type
	    && effects[0].currency == effects[1].currency
	    && !effects[0].amount.compareTo(effects[1].amount.negate())
	  ) {
	    return true;
	  }
	};

	/**
	 * Simple static class for processing server-side JSON.
	 */
	var JsonRewriter = module.exports = {
	  /**
	   * Filter affected nodes by type.
	   *
	   * If affectedNodes is not a valid set of nodes, returns an empty array.
	   */
	  filterAnodes: function (affectedNodes, type) {
	    if (!affectedNodes) return [];

	    return affectedNodes.filter(function (an) {
	      an = an.CreatedNode ? an.CreatedNode :
	          an.ModifiedNode ? an.ModifiedNode :
	          {};

	      return an.LedgerEntryType === type;
	    });
	  },

	  /**
	   * Returns resulting (new or modified) fields from an affected node.
	   */
	  getAnodeResult: function (an) {
	    an = an.CreatedNode ? an.CreatedNode :
	        an.ModifiedNode ? an.ModifiedNode :
	        {};

	    var fields = $.extend({}, an.NewFields, an.FinalFields);

	    return fields;
	  },

	  /**
	   * Takes a metadata affected node and returns a simpler JSON object.
	   *
	   * The resulting object looks like this:
	   *
	   *   {
	   *     // Type of diff, e.g. CreatedNode, ModifiedNode
	   *     diffType: 'CreatedNode'
	   *
	   *     // Type of node affected, e.g. RippleState, AccountRoot
	   *     entryType: 'RippleState',
	   *
	   *     // Index of the ledger this change occurred in
	   *     ledgerIndex: '01AB01AB...',
	   *
	   *     // Contains all fields with later versions taking precedence
	   *     //
	   *     // This is a shorthand for doing things like checking which account
	   *     // this affected without having to check the diffType.
	   *     fields: {...},
	   *
	   *     // Old fields (before the change)
	   *     fieldsPrev: {...},
	   *
	   *     // New fields (that have been added)
	   *     fieldsNew: {...},
	   *
	   *     // Changed fields
	   *     fieldsFinal: {...}
	   *   }
	   */
	  processAnode: function (an) {
	    var result = {};

	    ["CreatedNode", "ModifiedNode", "DeletedNode"].forEach(function (x) {
	      if (an[x]) result.diffType = x;
	    });

	    if (!result.diffType) return null;

	    an = an[result.diffType];

	    result.entryType = an.LedgerEntryType;
	    result.ledgerIndex = an.LedgerIndex;

	    result.fields = $.extend({}, an.PreviousFields, an.NewFields, an.FinalFields);
	    result.fieldsPrev = an.PreviousFields || {};
	    result.fieldsNew = an.NewFields || {};
	    result.fieldsFinal = an.FinalFields || {};

	    return result;
	  },

	  /**
	   * Convert transactions into a more useful (for our purposes) format.
	   *
	   * The main operation this function performs is to change the view on the
	   * transaction from a neutral view to a subjective view specific to our
	   * account.
	   *
	   * For example, rather than having a sender and receiver, the transaction has
	   * a counterparty and a flag whether it is incoming or outgoing.
	   *
	   * processTxn returns main purpose of transaction and side effects.
	   *
	   * Main purpose
	   *  Real transaction names
	   *  - Payment (sent/received/exchange)
	   *  - TrustSet (trusting/trusted)
	   *  - OfferCreate (offernew)
	   *  - OfferCancel (offercancel)
	   *
	   *  Virtual transaction names
	   *  - Failed
	   *  - Rippling
	   *
	   * Side effects
	   *  - balance_change
	   *  - Trust (trust_create_local, trust_create_remote, trust_change_local,
	   *          trust_change_remote, trust_change_balance, trust_change_no_ripple)
	   *  - Offer (offer_created, offer_funded, offer_partially_funded,
	   *          offer_cancelled, offer_bought)
	   */
	  processTxn: function (tx, meta, account) {
	    var obj = {};

	    // Currency balances that have been affected by the transaction
	    var affected_currencies = [];

	    // Main transaction
	    if (tx.Account === account
	        || (tx.Destination && tx.Destination === account)
	        || (tx.LimitAmount && tx.LimitAmount.issuer === account)) {

	      var transaction = {};

	      if ('tesSUCCESS' === meta.TransactionResult) {
	        switch (tx.TransactionType) {
	          case 'Payment':
	            var amount = ripple.Amount.from_json(tx.Amount);

	            if (tx.Account === account) {
	              if (tx.Destination === account) {
	                transaction.type = 'exchange';
	                transaction.spent = ripple.Amount.from_json(tx.SendMax);
	              }
	              else {
	                transaction.type = 'sent';
	                transaction.counterparty = tx.Destination;
	              }
	            }
	            else {
	              transaction.type = 'received';
	              transaction.counterparty = tx.Account;
	            }

	            transaction.amount = amount;
	            transaction.currency = amount.currency().to_human();
	            break;

	          case 'TrustSet':
	            transaction.type = tx.Account === account ? 'trusting' : 'trusted';
	            transaction.counterparty = tx.Account === account ? tx.LimitAmount.issuer : tx.Account;
	            transaction.amount = ripple.Amount.from_json(tx.LimitAmount);
	            transaction.currency = tx.LimitAmount.currency;
	            break;

	          case 'OfferCreate':
	            transaction.type = 'offernew';
	            transaction.pays = ripple.Amount.from_json(tx.TakerPays);
	            transaction.gets = ripple.Amount.from_json(tx.TakerGets);
	            transaction.sell = tx.Flags & ripple.Transaction.flags.OfferCreate.Sell;
	            break;

	          case 'OfferCancel':
	            transaction.type = 'offercancel';
	            break;

	          case 'AccountSet':
	            // Ignore empty accountset transactions. (Used to sync sequence numbers)
	            if (meta.AffectedNodes.length === 1 && _.size(meta.AffectedNodes[0].ModifiedNode.PreviousFields) === 2)
	              break;

	            transaction.type = 'accountset';
	            break;

	          default:
	            console.log('Unknown transaction type: "'+tx.TransactionType+'"', tx);
	        }

	        if (tx.Flags) {
	          transaction.flags = tx.Flags;
	        }
	      } else {
	        transaction.type = 'failed';
	      }

	      if (!$.isEmptyObject(transaction)) {
	        obj.transaction = transaction;
	      }
	    }

	    // Side effects
	    if ('tesSUCCESS' === meta.TransactionResult) {
	      meta.AffectedNodes.forEach(function (n) {
	        var node = JsonRewriter.processAnode(n);
	        var feeEff;
	        var effect = {};

	        // AccountRoot - Current account node
	        if (node.entryType === "AccountRoot" && node.fields.Account === account) {
	          obj.accountRoot = node.fields;

	          if (node.fieldsPrev.Balance) {
	            var balance = ripple.Amount.from_json(node.fields.Balance);

	            // Fee
	            if(tx.Account === account && tx.Fee) {
	              feeEff = {
	                type: "fee",
	                amount: ripple.Amount.from_json(tx.Fee).negate(),
	                balance: balance
	              };
	            }

	            // Updated XRP Balance
	            if (tx.Fee != node.fieldsPrev.Balance - node.fields.Balance) {
	              if (feeEff)
	                balance = balance.subtract(feeEff.amount);

	              effect.type = "balance_change";
	              effect.amount = balance.subtract(node.fieldsPrev.Balance);
	              effect.balance = balance;

	              // balance_changer is set to true if the transaction / effect has changed one of the account balances
	              obj.balance_changer = effect.balance_changer = true;
	              affected_currencies.push('XRP');
	            }
	          }
	        }

	        // RippleState - Ripple Lines
	        if (node.entryType === "RippleState"
	            && (node.fields.HighLimit.issuer === account || node.fields.LowLimit.issuer === account)) {

	          var high = node.fields.HighLimit;
	          var low = node.fields.LowLimit;

	          var which = high.issuer === account ? 'HighNoRipple' : 'LowNoRipple';

	          // New trust line
	          if (node.diffType === "CreatedNode") {
	            effect.limit = ripple.Amount.from_json(high.value > 0 ? high : low);
	            effect.limit_peer = ripple.Amount.from_json(high.value > 0 ? low : high);

	            if ((high.value > 0 && high.issuer === account)
	                || (low.value > 0 && low.issuer === account)) {
	              effect.type = "trust_create_local";
	            } else {
	              effect.type = "trust_create_remote";
	            }
	          }

	          // Modified trust line
	          else if (node.diffType === "ModifiedNode" || node.diffType === "DeletedNode") {
	            var highPrev = node.fieldsPrev.HighLimit;
	            var lowPrev = node.fieldsPrev.LowLimit;

	            // Trust Balance change
	            if (node.fieldsPrev.Balance) {
	              effect.type = "trust_change_balance";

	              var issuer =  node.fields.Balance.value > 0 || node.fieldsPrev.Balance.value > 0
	                  ? high.issuer : low.issuer;

	              effect.amount = high.issuer === account
	                  ? effect.amount = ripple.Amount.from_json(
	                  node.fieldsPrev.Balance.value
	                      + "/" + node.fieldsPrev.Balance.currency
	                      + "/" + issuer).subtract(node.fields.Balance)
	                  : effect.amount = ripple.Amount.from_json(
	                  node.fields.Balance.value
	                      + "/" + node.fields.Balance.currency
	                      + "/" + issuer).subtract(node.fieldsPrev.Balance);

	              obj.balance_changer = effect.balance_changer = true;
	              affected_currencies.push(high.currency.toUpperCase());
	            }

	            // Trust Limit change
	            else if (highPrev || lowPrev) {
	              if (high.issuer === account) {
	                effect.limit = ripple.Amount.from_json(high);
	                effect.limit_peer = ripple.Amount.from_json(low);
	              } else {
	                effect.limit = ripple.Amount.from_json(low);
	                effect.limit_peer = ripple.Amount.from_json(high);
	              }

	              if (highPrev) {
	                effect.prevLimit = ripple.Amount.from_json(highPrev);
	                effect.type = high.issuer === account ? "trust_change_local" : "trust_change_remote";
	              }
	              else if (lowPrev) {
	                effect.prevLimit = ripple.Amount.from_json(lowPrev);
	                effect.type = high.issuer === account ? "trust_change_remote" : "trust_change_local";
	              }
	            }

	            // Trust flag change (effect gets this type only if nothing else but flags has been changed)
	            else if (node.fieldsPrev.Flags) {
	              // Account set a noRipple flag
	              if (node.fields.Flags & ripple.Remote.flags.state[which] &&
	                  !(node.fieldsPrev.Flags & ripple.Remote.flags.state[which])) {
	                effect.type = "trust_change_no_ripple";
	              }

	              // Account removed the noRipple flag
	              else if (node.fieldsPrev.Flags & ripple.Remote.flags.state[which] &&
	                  !(node.fields.Flags & ripple.Remote.flags.state[which])) {
	                effect.type = "trust_change_no_ripple";
	              }

	              if (effect.type)
	                effect.flags = node.fields.Flags;
	            }
	          }

	          if (!$.isEmptyObject(effect)) {
	            effect.counterparty = high.issuer === account ? low.issuer : high.issuer;
	            effect.currency = high.currency;
	            effect.balance = high.issuer === account
	                ? ripple.Amount.from_json(node.fields.Balance).negate(true)
	                : ripple.Amount.from_json(node.fields.Balance);

	            if (obj.transaction && obj.transaction.type === "trust_change_balance") {
	              obj.transaction.balance = effect.balance;
	            }

	            // noRipple flag
	            if (node.fields.Flags & ripple.Remote.flags.state[which]) {
	              effect.noRipple = true;
	            }
	          }
	        }

	        // Offer
	        else if (node.entryType === "Offer") {

	          // For new and cancelled offers we use "fields"
	          var fieldSet = node.fields;

	          // Current account offer
	          if (node.fields.Account === account) {

	            // Partially funded offer [and deleted.. no more funds]
	            /* Offer has been partially funded and deleted (because of the luck of funds)
	             if the node is deleted and the TakerGets/TakerPays field has been changed */
	            if (node.diffType === "ModifiedNode" ||
	                (node.diffType === "DeletedNode"
	                    && node.fieldsPrev.TakerGets
	                    && !ripple.Amount.from_json(node.fieldsFinal.TakerGets).is_zero())) {
	              effect.type = 'offer_partially_funded';

	              if (node.diffType !== "DeletedNode") {
	                effect.remaining = ripple.Amount.from_json(node.fields.TakerGets);
	              }
	              else {
	                effect.cancelled = true;
	              }
	            }
	            else {
	              // New / Funded / Cancelled offer
	              effect.type = node.diffType === "CreatedNode"
	                  ? 'offer_created'
	                  : node.fieldsPrev.TakerPays
	                  ? 'offer_funded'
	                  : 'offer_cancelled';

	              // For funded offers we use "fieldsPrev".
	              if (effect.type === 'offer_funded')
	                fieldSet = node.fieldsPrev;

	              // We don't count cancelling an offer as a side effect if it's
	              // already the primary effect of the transaction.
	              if (effect.type === 'offer_cancelled' &&
	                  obj.transaction &&
	                  obj.transaction.type === "offercancel") {

	                // Fill in remaining information about offer
	                obj.transaction.gets = fieldSet.TakerGets;
	                obj.transaction.pays = fieldSet.TakerPays;
	              }
	            }

	            effect.seq = +node.fields.Sequence;
	          }

	          // Another account offer. We care about it only if our transaction changed the offer amount (we bought currency)
	          else if(tx.Account === account && !$.isEmptyObject(node.fieldsPrev) /* Offer is unfunded if node.fieldsPrev is empty */) {
	            effect.type = 'offer_bought';
	          }

	          if (effect.type) {
	            effect.gets = ripple.Amount.from_json(fieldSet.TakerGets);
	            effect.pays = ripple.Amount.from_json(fieldSet.TakerPays);

	            if ('offer_partially_funded' === effect.type || 'offer_bought' === effect.type) {
	              effect.got = ripple.Amount.from_json(node.fieldsPrev.TakerGets).subtract(node.fields.TakerGets);
	              effect.paid = ripple.Amount.from_json(node.fieldsPrev.TakerPays).subtract(node.fields.TakerPays);
	            }
	          }

	          if (effect.gets && effect.pays) {
	            effect.price = getPrice(effect, tx.date);
	          }

	          // Flags
	          if (node.fields.Flags) {
	            effect.flags = node.fields.Flags;
	            effect.sell = node.fields.Flags & ripple.Remote.flags.offer.Sell;
	          }
	        }

	        if (!$.isEmptyObject(effect)) {
	          if (node.diffType === "DeletedNode") {
	            effect.deleted = true;
	          }

	          if (!obj.effects) obj.effects = [];
	          obj.effects.push(effect);
	        }

	        // Fee effect
	        if (feeEff) {
	          if (!obj.effects) obj.effects = [];
	          obj.effects.push(feeEff);
	        }
	      });
	    }

	    // Balance after the transaction
	    if (obj.accountRoot && obj.transaction && "undefined" === typeof obj.transaction.balance) {
	      obj.transaction.balance = ripple.Amount.from_json(obj.accountRoot.Balance);
	    }

	    if ($.isEmptyObject(obj))
	      return;

	    // If the transaction didn't wind up cancelling an offer
	    if (tx.TransactionType === 'OfferCancel' && obj.transaction &&
	      (!obj.transaction.gets || !obj.transaction.pays)) {
	      return;
	    }

	    // Rippling transaction
	    if (isRippling(obj.effects)) {
	      if (!obj.transaction) {
	        obj.transaction = {};
	      }
	      obj.transaction.type = 'rippling';
	    }

	    obj.tx_type = tx.TransactionType;
	    obj.tx_result = meta.TransactionResult;
	    obj.fee = tx.Fee;
	    obj.date = ripple.utils.toTimestamp(tx.date);
	    obj.dateRaw = tx.date;
	    obj.hash = tx.hash;
	    obj.affected_currencies = affected_currencies ? affected_currencies : [];
	    obj.ledger_index = tx.ledger_index;

	    return obj;
	  }
	};


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Description: Combines 2 arrays removing duplicates based on a object key
	 * @param arr1: Array of objects
	 * @param arr2: Array of objects
	 * @param key:  object key to be unique
	 *
	 * @return array of unique objects based on key
	 */
	exports.uniqueObjArray = function(arr1, arr2, key) {
	  var obj = {};
	  _.each(arr1, function(v) {
	    obj[v[key]] = v;
	  });

	  _.each(arr2, function(v) {
	    if (!(v[key] in obj)) {
	      obj[v[key]] = v;
	    }
	  });

	  return _.values(obj);
	}


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Ripple default external currency list.
	 *
	 * These currencies are ranked by value of notes in circulation. Source:
	 *
	 * * http://goldnews.bullionvault.com/all_the_money_in_the_world_102720093
	 *   (A better source is welcome. Note: The US dollar was moved to the top.)
	 *
	 * Important: XRP must be the first entry in this list.
	 */
	module.exports = [
	  {value: 'XRP', name: 'Ripples', order: 5},
	  {value: 'DNX', name: 'DINEX', order: 4},
	  {value: 'CLP', name: 'Pesos Chilenos', order: 4}
	];


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Ripple trading default currency pairs.
	 *
	 * This list is a bit arbitrary, but it's basically the Majors [1] from forex
	 * trading with some XRP pairs added.
	 *
	 * [1] http://en.wikipedia.org/wiki/Currency_pair#The_Majors
	 */

	var DEFAULT_PAIRS = [
	  {name: 'XAU (-0.5%pa)/XRP', last_used: 2},
	  {name: 'XAU (-0.5%pa)/USD', last_used: 2},
	  {name: 'BTC/XRP', last_used: 1},
	  {name: 'XRP/USD', last_used: 1},
	  {name: 'XRP/EUR', last_used: 1},
	  {name: 'XRP/JPY', last_used: 0},
	  {name: 'XRP/GBP', last_used: 0},
	  {name: 'XRP/AUD', last_used: 0},
	  {name: 'XRP/CHF', last_used: 0},
	  {name: 'XRP/CAD', last_used: 0},
	  {name: 'XRP/CNY', last_used: 0},
	  {name: 'XRP/MXN', last_used: 0},
	  {name: 'BTC/USD', last_used: 0},
	  {name: 'BTC/EUR', last_used: 0},
	  {name: 'EUR/USD', last_used: 0},
	  {name: 'USD/JPY', last_used: 0},
	  {name: 'GBP/USD', last_used: 0},
	  {name: 'AUD/USD', last_used: 0},
	  {name: 'USD/MXN', last_used: 0},
	  {name: 'USD/CHF', last_used: 0}
	];

	module.exports = DEFAULT_PAIRS;

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(80);

	module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
	attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
	var buf = [];
	with (locals || {}) {
	var interp;
	switch (tx.type){
	case "sent":
	buf.push('<div class="type-info">Ha enviado <span class="number">{{tx.amount | rpamount}}</span> <span class="currency">{{tx.currency}}</span> a <span title="{{tx.counterparty}}">{{tx.counterparty | rpcontactname}}</span></div>');
	  break;
	case "received":
	buf.push('<div class="type-success"><span title="{{tx.counterparty}}">{{tx.counterparty | rpcontactname}} le ha enviado</span>&#32;<span class="number">{{tx.amount | rpamount}}</span>&#32;<span class="currency">{{tx.currency}}</span></div>');
	  break;
	case "trusted":
	buf.push('<div class="type-success"><span title="{{tx.counterparty}}">{{tx.counterparty | rpcontactname}} now trusts you for</span>&#32;<span class="number">{{tx.amount | rpamount}}</span>&#32;<span class="currency">{{tx.currency}}</span></div>');
	  break;
	case "trusting":
	buf.push('<div class="type-success"><span title="{{tx.counterparty}}">You now trust {{tx.counterparty | rpcontactname}} for</span>&#32;<span class="number">{{tx.amount | rpamount}}</span>&#32;<span class="currency">{{tx.currency}}</span></div>');
	  break;
	}
	}
	return buf.join("");
	}

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	  // Ripple Credits
	  "XRP":[0, 0],

	  // Official ISO-4217
	  "AFN":[971, 2],
	  "EUR":[978, 2],
	  "ALL":[8, 2],
	  "DZD":[12, 2],
	  "USD":[840, 2],
	  "AOA":[973, 2],
	  "XCD":[951, 2],
	  "ARS":[32, 2],
	  "AMD":[51, 2],
	  "AWG":[533, 2],
	  "AUD":[36, 2],
	  "AZN":[944, 2],
	  "BSD":[44, 2],
	  "BHD":[48, 3],
	  "BDT":[50, 2],
	  "BBD":[52, 2],
	  "BYR":[974, 0],
	  "BZD":[84, 2],
	  "XOF":[952, 0],
	  "BMD":[60, 2],
	  "BTN":[64, 2],
	  "INR":[356, 2],
	  "BOB":[68, 2],
	  "BOV":[984, 2],
	  "BAM":[977, 2],
	  "BWP":[72, 2],
	  "NOK":[578, 2],
	  "BRL":[986, 2],
	  "BND":[96, 2],
	  "BGN":[975, 2],
	  "BIF":[108, 0],
	  "KHR":[116, 2],
	  "XAF":[950, 0],
	  "CAD":[124, 2],
	  "CVE":[132, 2],
	  "KYD":[136, 2],
	  "CLF":[990, 0],
	  "CLP":[152, 0],
	  "CNY":[156, 2],
	  "COP":[170, 2],
	  "COU":[970, 2],
	  "KMF":[174, 0],
	  "CDF":[976, 2],
	  "NZD":[554, 2],
	  "CRC":[188, 2],
	  "HRK":[191, 2],
	  "CUC":[931, 2],
	  "CUP":[192, 2],
	  "ANG":[532, 2],
	  "CZK":[203, 2],
	  "DKK":[208, 2],
	  "DJF":[262, 0],
	  "DOP":[214, 2],
	  "EGP":[818, 2],
	  "SVC":[222, 2],
	  "ERN":[232, 2],
	  "ETB":[230, 2],
	  "FKP":[238, 2],
	  "FJD":[242, 2],
	  "XPF":[953, 0],
	  "GMD":[270, 2],
	  "GEL":[981, 2],
	  "GHS":[936, 2],
	  "GIP":[292, 2],
	  "GTQ":[320, 2],
	  "GBP":[826, 2],
	  "GNF":[324, 0],
	  "GYD":[328, 2],
	  "HTG":[332, 2],
	  "HNL":[340, 2],
	  "HKD":[344, 2],
	  "HUF":[348, 2],
	  "ISK":[352, 0],
	  "IDR":[360, 2],
	  "IRR":[364, 2],
	  "IQD":[368, 3],
	  "ILS":[376, 2],
	  "JMD":[388, 2],
	  "JPY":[392, 0],
	  "JOD":[400, 3],
	  "KZT":[398, 2],
	  "KES":[404, 2],
	  "KPW":[408, 2],
	  "KRW":[410, 0],
	  "KWD":[414, 3],
	  "KGS":[417, 2],
	  "LAK":[418, 2],
	  "LVL":[428, 2],
	  "LBP":[422, 2],
	  "LSL":[426, 2],
	  "ZAR":[710, 2],
	  "LRD":[430, 2],
	  "LYD":[434, 3],
	  "CHF":[756, 2],
	  "LTL":[440, 2],
	  "MOP":[446, 2],
	  "MKD":[807, 2],
	  "MGA":[969, 2],
	  "MWK":[454, 2],
	  "MYR":[458, 2],
	  "MVR":[462, 2],
	  "MRO":[478, 2],
	  "MUR":[480, 2],
	  "MXN":[484, 2],
	  "MXV":[979, 2],
	  "MDL":[498, 2],
	  "MNT":[496, 2],
	  "MAD":[504, 2],
	  "MZN":[943, 2],
	  "MMK":[104, 2],
	  "NAD":[516, 2],
	  "NPR":[524, 2],
	  "NIO":[558, 2],
	  "NGN":[566, 2],
	  "OMR":[512, 3],
	  "PKR":[586, 2],
	  "PAB":[590, 2],
	  "PGK":[598, 2],
	  "PYG":[600, 0],
	  "PEN":[604, 2],
	  "PHP":[608, 2],
	  "PLN":[985, 2],
	  "QAR":[634, 2],
	  "RON":[946, 2],
	  "RUB":[643, 2],
	  "RWF":[646, 0],
	  "SHP":[654, 2],
	  "WST":[882, 2],
	  "STD":[678, 2],
	  "SAR":[682, 2],
	  "RSD":[941, 2],
	  "SCR":[690, 2],
	  "SLL":[694, 2],
	  "SGD":[702, 2],
	  "SBD":[90, 2],
	  "SOS":[706, 2],
	  "SSP":[728, 2],
	  "LKR":[144, 2],
	  "SDG":[938, 2],
	  "SRD":[968, 2],
	  "SZL":[748, 2],
	  "SEK":[752, 2],
	  "CHE":[947, 2],
	  "CHW":[948, 2],
	  "SYP":[760, 2],
	  "TWD":[901, 2],
	  "TJS":[972, 2],
	  "TZS":[834, 2],
	  "THB":[764, 2],
	  "TOP":[776, 2],
	  "TTD":[780, 2],
	  "TND":[788, 3],
	  "TRY":[949, 2],
	  "TMT":[934, 2],
	  "UGX":[800, 0],
	  "UAH":[980, 2],
	  "AED":[784, 2],
	  "USN":[997, 2],
	  "USS":[998, 2],
	  "UYI":[940, 0],
	  "UYU":[858, 2],
	  "UZS":[860, 2],
	  "VUV":[548, 0],
	  "VEF":[937, 2],
	  "VND":[704, 0],
	  "YER":[886, 2],
	  "ZMK":[894, 2],
	  "ZWL":[932, 2]
	}


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(80);

	module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
	attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
	var buf = [];
	with (locals || {}) {
	var interp;
	buf.push('<div ng-switch on="engine_result | rptruncate:3" class="transaction-error"><group ng-switch-when="tes"><group ng-hide="accepted" class="pending"><h2 class="tx-status">Su transacción ha sido enviada.</h2><p>El balance de su cuenta se actualizará una vez que la transacción se haya confirmado.</p></group><group ng-show="accepted" class="result-success"><h2 class="tx-status">Transacción confirmada!</h2></group></group><group ng-switch-when="tep" class="result-partial"><h2 class="tx-status">Transacción parcialmente válida!</h2><p>Su transacción se ha realizado parcialmente.</p></group><group ng-switch-when="tem" class="result-malformed"><h2 class="tx-status">Transacción mal hecha!</h2><p ng-switch on="engine_result"><span ng-switch-default="ng-switch-default">Su transacción es inválida, debido a: {{engine_result}} - {{engine_result_message}}</span></p></group><group ng-switch-when="tef" class="result-malformed"><div ng-switch on="engine_result"><div ng-switch-when="tefMAX_LEDGER"><h2 class="tx-status">Tiempo de transacción excedido.</h2><p ng-switch on="engine_result"><span>Por favor intente nuevamente.</span></p></div><div ng-switch-default="ng-switch-default"><h2 class="tx-status">Transacción mal hecha!</h2><p ng-switch on="engine_result"><span ng-switch-when="tefDST_TAG_NEEDED">La cuenta de destino requiere que se especifique la etiqueta para realizar pagos.</span></p></div></div></group><group ng-switch-when="tel" class="result-failed"><h2 class="tx-status">Transacción fallida!</h2><p ng-switch on="engine_result"><span ng-switch-when="telINSUF_FEE_P">El servidor al que envió la transacción estaba demasiado ocupado para procesar o redirigir su transacción con la comisión que ha incluido.</span></p></group><group ng-switch-when="tec" class="result-malformed"><h2 class="tx-status">Transacción fallida!</h2><p ng-switch on="engine_result"><span ng-switch-when="tecNO_DST">La cuenta de destino no existe.</span><span ng-switch-when="tecNO_DST_INSUF_XRP">La cuenta de destino no existe. Se debe cargar saldo para crearla.</span><span ng-switch-default="ng-switch-default">Error: {{engine_result_message}}</span></p></group><group ng-switch-when="ter" class="result-failed"><h2 class="tx-status">Transacción fallida!</h2><p ng-switch on="engine_result"><span ng-switch-when="terNO_LINE">Usted no puede realizar pagos en esta moneda.</span></p><span ng-switch-default="ng-switch-default">Su transacción no pudo ser confirmada: {{engine_result}} - {{engine_result_message}}</span></group><group ng-switch-when="tej" class="result-failed"><h2 class="tx-status">Transacción fallida!</h2><p ng-switch on="engine_result"><span ng-switch-when="tejLost">Dinex no pudo enviar la transacción.</span><span ng-switch-when="tejMaxFeeExceeded">Red ocupada. Por favor intente más tarde.</span></p><span ng-switch-default="ng-switch-default">Su transacción no pudo ser enviada: {{engine_result}} - {{engine_result_message}}</span></group></div>');
	}
	return buf.join("");
	}

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(80);

	module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
	attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
	var buf = [];
	with (locals || {}) {
	var interp;
	buf.push('<form role="form" ng-submit="confirm()"><div class="modal-header">Desbloquear cuenta</div><div class="modal-body"><div class="form-group"><label for="popup_unlock_password">Contraseña</label><input id="popup_unlock_password" type="password" name="popup_unlock_password" ng-model="unlock.password" rp-focus="rp-focus" class="form-control"/></div><p ng-switch on="unlock.purpose" class="help-block"><span ng-switch-when="showSecret">Por favor ingrese su contraseña para mostrar su clave secreta.</span><span ng-switch-default="ng-switch-default">Por favor ingrese su contraseña para confirmar la transacción.</span></p><div ng-show="unlock.error == \'password\'" class="alert alert-danger">Contraseña incorrecta, por favor intente nuevamente.</div><p ng-show="unlock.isConfirming" rp-spinner="4" class="literal">Confirmando contraseña</p></div><div class="modal-footer"><button type="button" ng-click="cancel()" class="btn btn-default">Cerrar</button><button type="submit" ng-disabled="isConfirming" class="btn btn-primary">Enviar</button></div></form>');
	}
	return buf.join("");
	}

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(76),
	    webutil = __webpack_require__(52),
	    log = __webpack_require__(53);

	var Tab = function (config)
	{
	};

	Tab.prototype.pageMode = 'default';

	Tab.prototype.mainMenu = 'none';

	/**
	 * AngularJS dependencies.
	 *
	 * List any controllers the tab uses here.
	 */
	Tab.prototype.angularDeps = [
	  // Directives
	  'charts',
	  'effects',
	  'events',
	  'fields',
	  'formatters',
	  'directives',
	  'validators',
	  'datalinks',
	  // Filters
	  'filters'
	];

	/**
	 * Other routes this tab should handle.
	 */
	Tab.prototype.aliases = [];

	exports.Tab = Tab;


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(80);

	module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
	attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
	var buf = [];
	with (locals || {}) {
	var interp;
	buf.push('<section ng-controller="RegisterCtrl" class="col-xs-12 content"><div class="row col-md-12"><div class="welcome-wrapper"><div ng-show="showAnnouncement" class="auth-attention banner"><h4>Registro de nuevos usuarios está desactivado en la cuenta demo por seguridad.</h4></div><h3 class="platform">DineX es la primera cuenta móvil para el pago de transporte. Segura y confiable, en todas partes.</h3><h4 class="new"></h4></div></div><div ng-show="mode==&quot;form&quot;" class="row auth-form-container col-sm-offset-2 col-sm-8 col-md-offset-3 col-md-6"><div class="auth-form-wrapper"><form name="registerForm" ng-submit="submitForm()"><h2 ng-hide="oldUserBlob">Registrarse</h2><div class="sign-up-steps-list"><li class="active">Paso <span> 1</span></li><li>Paso <span> 2</span></li><li>Paso <span> 3</span></li></div><div class="form-group"><label for="register_username" ng-hide="oldUserBlob">Crear un nombre DineX</label><div ng-show="oldUserBlob" class="auth-attention">Por favor elija un nombre Dinex a continuación. Este será su nombre de usuario para ingresar a Dinex, así que recuerdelo! Los nombres Dinex son únicos. <a href="https://support.ripplelabs.com/hc/en-us/articles/202507548-Understanding-Ripple-Names">Saber más</a></div><div class="input-group"><span class="input-group-addon ripple-addon">~</span><input id="register_username" name="register_username" type="text" ng-model="username" required="required" rp-focus="rp-focus" autocomplete="off" maxlength="20" rpDest="rpDest" rp-available-name="rp-available-name" rp-available-name-invalid-reason="usernameInvalidReason" rp-available-name-reserved-for="usernameReservedFor" rp-loading="usernameLoading" class="form-control"/></div><div rp-errors="register_username" ng-hide="usernameLoading" class="errorGroup"><div rp-error-valid="rp-error-valid" class="success">Available</div><div rp-error-on="rpAvailableName" class="error"><span ng-switch on="usernameInvalidReason"><span ng-switch-when="exists">Ya registrado!</span><span ng-switch-when="reserved">Reservado para {{usernameReservedFor}}<span>&#32;</span><i rp-popover="rp-popover" rp-popover-placement="bottom" rp-popover-title="Reserved domain" rp-popover-trigger="click" ng-switch-when="reserved" data-content="This name belongs to a high-traffic website and has been reserved to prevent phishing." class="fa fa-question-circle"></i></span><span ng-switch-when="tooshort">Debe tener al menos dos caracteres</span><span ng-switch-when="toolong">Debe tener como máximo 20 caracteres</span><span ng-switch-when="charset">Puede usar sólo los siguientes caracteres: a-z, 0-9 y guión (-)</span><span ng-switch-when="starthyphen">No puede empezar por guión (-)</span><span ng-switch-when="endhyphen">No puede terminar en guión (-)</span><span ng-switch-when="multhyphen">No puede usar guiones seguidos (--)</span></span></div></div><span ng-show="usernameLoading">Comprobando...</span></div><div ng-class="{\'field-error\': \'weak\' === strength || \'match\' === strength}" class="form-group"><label for="register_password">Contraseña</label><input id="register_password" name="register_password1" type="password" autocomplete="off" ng-model="password1" rp-strong-password="rp-strong-password" required="required" rp-same-in-set="passwordSet" class="form-control"/><p ng-show="strength==\'weak\'"><span>Su contraseña es débil. No contiene números y símbolos o es muy corta.</span></p><p ng-show="strength==\'match\'"><span>Su nombre Dinex y contraseña no pueden coincidir. Por favor cree una nueva contraseña.</span></p></div><div ng-class="{\'field-error\': registerForm.register_password1.$error.rpSameInSet &amp;&amp; registerForm.register_password2.$dirty}" class="form-group"><label for="register_password2">Confirmar contraseña</label><input id="register_password2" name="register_password2" autocomplete="off" type="password" ng-model="password2" required="required" rp-same-in-set="passwordSet" class="form-control"/><p ng-show="registerForm.register_password1.$error.rpSameInSet &amp;&amp; registerForm.register_password2.$dirty"><span>Contraseñas no coinciden</span></p></div><div ng-show=""><div class="form-group"><div class="strength {{strength}}">{{strength}}</div></div></div><div ng-class="{\'field-error\': registerForm.register_email.$error.email &amp;&amp; registerForm.register_email.$dirty}" class="form-group"><label for="register_email">Email</label><input type="email" name="register_email" id="register_email" placeholder="" ng-model="email" required="required" class="form-control"/><p ng-show="registerForm.register_email.$error.email &amp;&amp; registerForm.register_email.$dirty"><span>Dirección de correo no válida</span></p></div><div ng-show="showMasterKeyInput" ng-class="{\'field-error\': (registerForm.register_masterkey.$error.rpMasterKey || registerForm.register_masterkey.$error.rpMasterAddressExists)  &amp;&amp; registerForm.register_masterkey.$dirty}" class="form-group"><label for="register_masterkey">Clave secreta</label><a href="" ng-click="showMasterKeyInput=false">ocultar</a><div class="register_masterkey"><input id="register_masterkey" name="register_masterkey" type="text" autocomplete="off" ng-model="masterkey" rp-master-key="rp-master-key" rp-master-address-exists="rp-master-address-exists" rp-focus="rp-focus" rp-spinner="{{checkingMasterkey ? 4 : null}}" class="form-control"/><p ng-show="registerForm.register_masterkey.$error.rpMasterKey"><span>Clave secreta de la cuenta no es válida</span></p><div ng-show="registerForm.register_masterkey.$error.rpMasterAddressExists &amp;&amp; masterkeyAddress" class="auth-attention"> <div>La cuenta ~<span>{{ masterkeyUsername }} </span><span>({{ masterkeyAddress }})</span> ya ha sido creada usando esta clave secreta.</div><a ng-href="#/recover/{{masterkeyUsername}}" class="btn btn-primary recovery">Recuperar cuenta</a></div></div></div><div ng-hide="showMasterKeyInput || oldUserBlob">¿Necesita usar su clave secreta? <a href="" ng-click="showMasterKeyInput=true">Usar clave secreta</a></div><div class="form-group"><div class="checkbox"><label for="terms">Acepto el <a href="#eula" target="_blank" l10n-inc="l10n-inc">acuerdo de licencia</a> {{productName}}</label><input id="terms" type="checkbox" name="terms" ng-model="terms" required="required"/></div></div><div class="see-privacy-text">Por favor lea nuestro <a href="#privacy" target="_blank">politica de privacidad</a> para ver como recolectamos y usamos su información.</div><!--.submit-btn-container<button type="submit" ng-disabled="registerForm.$invalid || submitLoading" rp-spinner="{{submitLoading ? 4 : null}}" class="btn btn-block btn-success"><span ng-hide="oldUserBlob">Registrarse</span></button>--></form></div><div class="switch-mode-link-container">Ya tiene cuenta? <a href="#login" l10n-inc="l10n-inc"> Ingresar</a></div></div><div ng-show="mode==&quot;failed&quot;" class="row mode-masterkeyerror"><div class="col-xs-12 col-md-10 col-md-offset-1"><p class="literal">Ocurrio un error durante el registro. Por favor intente nuevamente más tarde.</p><p class="literal">El error reportado fue: <span ng-bind="error_detail"></span></p><p><button ng-click="mode=&quot;form&quot;" class="btn btn-primary">Volver</button></p></div></div><div ng-show="mode==&quot;alreadyexists&quot;" class="row mode-masterkeyerror"><div class="col-xs-12 col-md-10 col-md-offset-1"><p class="literal">Ya hay una cuenta con ese nombre, por favor elija otro nombre e intente nuevamente.</p><p><button ng-click="mode=&quot;form&quot;" class="btn btn-primary">Volver</button></p></div></div><div ng-show="mode==&quot;secret&quot;" class="row auth-form-container col-sm-offset-2 col-sm-8 col-md-offset-3 col-md-6"><div class="auth-form-wrapper"><h2 ng-hide="oldUserBlob">Registrarse</h2><div class="sign-up-steps-list"><li>Step<span> 1</span></li><li class="active">Paso <span> 2</span></li><li>Paso <span> 3</span></li></div><div ng-hide="oldUserBlob" class="alert alert-info">Al continuar, usted entiende que por medidas de seguridad DineX no provee un mecanismo para recuperar la contraseña o la clave secreta. Si usted olvida su contraseña y su clave secreta, no podrá acceder a su cuenta.</div><div class="secret-key-container"><div ng-hide="oldUserBlob">La clave secreta desbloquea el acceso a los fondos de la cuenta aún cuando olvide su nombre de usuario DineX o su contraseña. Por favor escríbala y guardela en un lugar PRIVADO Y SEGURO. <a href="https://support.ripplelabs.com/hc/en-us/articles/201823366-Password-Recovery-and-Your-Secret-Key" target="_blank" l10n-inc="l10n-inc"> Lea más</a> acerca de claves y seguridad de su cuenta.</div><div ng-show="oldUserBlob">Si no ha guardado su clave secreta, por favor escríbala y guardela en un lugar PRIVADO Y SEGURO. En el caso de que olvide su nombre de usuario DineX o su contraseñ, con su clave secreta puede recuperar su cuenta.</div><div class="secret-key"><span class="fa fa-key"></span><span ng-hide="showSecret">•••••••••••••••••••••••••••••</span><span ng-show="showSecret">{{keyOpen}}</span></div><a href="" ng-click="showSecret=!showSecret"><span ng-hide="showSecret">Mostrar clave secreta</span><span ng-show="showSecret">Ocultar clave secreta</span></a></div><div class="submit-btn-container"><button ng-click="mode=&quot;verification&quot;" class="btn btn-block btn-success"><span>Continuar</span></button></div></div></div><div ng-show="mode==&quot;verification&quot;" class="row auth-form-container mode-verification col-sm-offset-2 col-sm-8 col-md-offset-3 col-md-6"><div class="auth-form-wrapper"><h2 ng-hide="oldUserBlob">Registrarse</h2><ul class="sign-up-steps-list"><li class="completed">Paso <span> 1</span></li><li class="completed">Paso <span> 2</span></li><li class="active">Paso <span> 3</span></li></ul><div class="auth-attention">Hemos enviado un Email a <span> {{userBlob.data.email}}</span>. Para completar su registro, siga el enlace en el Email.</div><div ng-show="resendSuccess" class="auth-attention">El Email de verificación ha sido re-enviado.</div><form name="resendForm" class="row"><div class="col-xs-12"><label>Email:</label></div><div class="col-xs-12 col-sm-8"><div class="change-email-bar"><input type="email" ng-model="newEmail" placeholder="{{userBlob.data.email}}" class="form-control"/></div></div><div class="col-xs-12 col-sm-4"><button ng-click="resendEmail()" type="submit" ng-disabled="resendForm.$invalid || resendLoading" rp-spinner="{{resendLoading ? 4 : null}}" class="btn btn-success btn-block">Re-enviar Email</button></div></form></div></div><div ng-show="mode==&quot;welcome&quot;" class="row mode-welcome"><div class="col-xs-12 col-md-10 col-md-offset-1"><p class="important">Importante:</p><p class="hint">La clave secreta desbloquea el acceso a los fondos de la cuenta aún cuando olvide su nombre de usuario DineX o su contraseña. Por favor escríbala y guardela en un lugar PRIVADO Y SEGURO. <a href="https://support.ripplelabs.com/hc/en-us/articles/201823366-Password-Recovery-and-Your-Secret-Key" target="_blank"> Lea más</a> acerca de claves y seguridad de su cuenta.</p><div class="credentials"><span class="username">Nombre de usuario:<span class="value">{{username}}</span></span><span class="password">Contraseña:<span ng-show="showPassword==true" class="value">{{password1}}&#32;</span><span ng-hide="showPassword==true" class="value">{{password}}</span><rp-confirm action-text="Are you in a safe place where no person or camera can see your screen?" action-button-text="Yes, show me" action-function="showPassword=true" cancel-button-text="no" ng-hide="showPassword==true"><a href="">Mostrar</a></rp-confirm><a href="" ng-click="showPassword=false" ng-show="showPassword==true">Ocultar</a></span></div><div class="secret"><p class="important"> </p><p class="key">{{address}}</p><p class="important">Clave secreta:</p><p ng-show="showSecret==true" class="key">{{keyOpen}}</p><p ng-hide="showSecret==true" class="key">{{key}}</p><p ng-hide="showSecret==true"><rp-confirm action-text="Are you in a safe place where no person or camera can see your screen?" action-button-text="Yes, show me" action-function="showSecret=true" cancel-button-text="no"><button class="btn btn-info btn-sm">Mostrar clave secreta</button></rp-confirm></p><p ng-show="showSecret==true"><button ng-click="showSecret=false" class="btn btn-info btn-sm">Ocultar clave secreta</button></p></div><p class="important">¿Ha guardado su clave secreta en un lugar seguro?</p><div class="row"><div class="col-xs-12 col-sm-5 col-lg-4"><a href="#balance" ng-click="goToFund()" class="btn btn-info btn-block btn-big">Sí, guardé mi clave secreta</a></div></div></div></div></section>');
	}
	return buf.join("");
	}

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(80);

	module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
	attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
	var buf = [];
	with (locals || {}) {
	var interp;
	buf.push('<section ng-controller="LoginCtrl" class="col-xs-12 content"><div ng-hide="$routeParams.tab" class="row auth-form-container col-sm-offset-2 col-sm-8 col-md-offset-3 col-md-6"><div ng-show="showAnnouncement" class="auth-attention banner"><h4>Bienvenido a DineX! </h4><ul><li> Ingresa a la cuenta de demostración para conductores. Aquí verás lo simple que es recibir pagos con DineX. La aplicación para Smartphones tiene las mismas vistas y funcionalidades.</li><li> Nombre de usuario: conductores</li><li> Contraseña: dinex777</li><li> Puedes abrir en otra ventana la cuenta de usuario pasajero y hacer un pago de prueba para que la veas en acción!</li><li> Cualquier duda escríbenos a info@dinex.cl o a través de nuestras redes sociales.</li></ul></div><div class="auth-form-wrapper"><form name="loginForm" ng-submit="submitForm()"><h2>Ingresar</h2><div ng-show="verifyStatus" class="auth-attention text-center"><div ng-show="\'verifying\' === verifyStatus" class="status">Verificando...</div><div ng-show="\'verified\' === verifyStatus" class="status">Ha verificado exitosamente su correo</div><div ng-show="\'error\' === verifyStatus" class="status">El mensaje de verificación de correo es inválido. Ha expirado o se ha reenviado. Por favor revise su bandeja de entrada por el correo más reciente.</div></div><div ng-hide="twoFactor" class="form-group"><label for="login_username">Nombre DineX</label><div class="input-group"><span class="input-group-addon ripple-addon">~</span><input id="login_username" name="login_username" type="text" ng-model="username" required="required" rp-focus-on-empty="rp-focus-on-empty" rp-autofill="$routeParams.username" class="form-control"/></div></div><div ng-hide="twoFactor" class="form-group"><label for="login_password">Contraseña</label><input id="login_password" name="login_password" type="password" ng-model="password" required="required" rp-focus="rp-focus" class="form-control"/></div><div ng-show="twoFactor"><div class="form-group"><span ng-show="twoFactor.via === \'sms\'" class="status">Por favor ingrese el código de verificaión del SMS enviado a su teléfono:</span><span ng-show="twoFactor.via === \'app\'" class="status">Por favor ingrese el código de verificación de la aplicación instalada en su dispositivo.</span><span ng-bind="maskedPhone" class="maskedPhone"> </span></div><div class="form-group text-right"> <button type="button" ng-click="requestToken()" class="btn btn-inline btn-primary"> <span ng-show="twoFactor.via === \'sms\'">Re-enviar</span><span ng-show="twoFactor.via === \'app\'">Enviar via SMS</span></button><a ng-click="cancel2FA()" class="txtbtn danger">Cancelar</a></div><div class="form-group"> <label for="token">Código de verificación</label><input id="login_password" name="token" ng-model="token" rp-focus="rp-focus" class="form-control"/></div><div class="form-group"><input name="rememberMe" type="checkbox" ng-model="rememberMe" class="rememberMe"/><label for="rememberMe">Recordarme en este dispositivo por 30 días</label></div></div><div ng-show="status" class="text-status"><span>{{status}}</span><br/><div ng-repeat="message in backendMessages" class="backend"><b>{{message.backend}} &#32;</b><span>{{message.message}}</span></div></div><div class="submit-btn-container"><button type="submit" rp-spinner="{{ajax_loading ? 4 : null}}" ng-disabled="ajax_loading || loginForm.$invalid" ng-hide="twoFactor" class="btn btn-submit btn-block btn-success"><span>Ingresar</span></button><button type="submit" rp-spinner="{{ajax_loading ? 4 : null}}" ng-disabled="ajax_loading || !token" ng-show="twoFactor" class="btn btn-submit btn-block btn-success"><span>Verificar</span></button></div><!--.submit-btn-container<a href="#recover/{{username}}" ng-show="showRecover" class="recover-btn"><button ng-click="" class="btn btn-block btn-primary"><span>Recuperar cuenta</span></button></a>--><!--a.recover(ng-href="#/recover/{{username}}", ng-hide="showRecover", l10n) Account Recovery--></form></div><div class="switch-mode-link-container">Nuevo en {{productName}}? <a href="#register" l10n-inc="l10n-inc">Registrarse</a></div></div><!--.row.action-login(ng-show="$routeParams.tab")<div class="col-xs-12 col-sm-6 col-md-6"><div ng-show="\'send\' == $routeParams.tab" class="info"><p class="literal">{{$routeParams.label}}</p><p ng-show="$routeParams.amount">va a enviar</p><p ng-hide="$routeParams.amount">va a enviar dinero al usuario DineX</p><div ng-show="$routeParams.amount" class="amount"><span class="number">{{$routeParams.amount | rpamount:{xrp_human: true} }}</span><span class="currency">{{$routeParams.amount | rpcurrency}}</span></div><p ng-show="$routeParams.amount">Al usuario DineX</p><div class="address">{{$routeParams.to}}</div></div><div ng-show="\'trust\' == $routeParams.tab" class="info"><p class="literal">{{$routeParams.label}}</p><p>va a confiar</p><div ng-show="$routeParams.amount" class="amount"><span class="number">{{$routeParams.amount | rpamount:{xrp_human: true, no_interest: true} }}</span><span class="currency">{{$routeParams.amount | rpcurrency}}</span></div><p ng-hide="$routeParams.name">Al usuario DineX</p><p ng-show="$routeParams.name">A <b> {{$routeParams.name}}</b> con dirección</p><div class="address">{{$routeParams.to}}</div></div><div ng-show="\'contacts\' == $routeParams.tab" class="info"><p class="literal">{{$routeParams.label}}</p><span><p l10n-inc="l10n-inc">you will add the user</p><div class="address">{{$routeParams.to}}</div><p l10n-inc="l10n-inc">To your ripple contacts</p></span></div></div><div class="col-xs-12 col-sm-6 col-md-5 col-lg-4 col-lg-offset-1"><form name="loginForm" ng-submit="submitForm()"><div ng-hide="twoFactor" class="form-group"><label for="login_username">Nombre DineX</label><div class="input-group"><span class="input-group-addon ripple-addon">~</span><input id="login_username" name="login_username" type="text" ng-model="username" required="required" rp-focus-on-empty="rp-focus-on-empty" rp-autofill="$routeParams.username" class="form-control"/></div></div><div ng-hide="twoFactor" class="form-group"><label for="login_password">Contraseña</label><input id="login_password" name="login_password" type="password" ng-model="password" required="required" rp-focus="rp-focus" class="form-control"/></div><div ng-show="twoFactor"><div class="form-group"><span ng-show="twoFactor.via === \'sms\'" class="status">Por favor ingrese el código de verificaión del SMS enviado a su teléfono:</span><span ng-show="twoFactor.via === \'app\'" class="status">Por favor ingrese el código de verificación de la aplicación instalada en su dispositivo.</span><span ng-bind="maskedPhone" class="maskedPhone"> </span></div><div class="form-group text-right"> <button type="button" ng-click="requestToken()" class="btn btn-inline btn-primary"> <span ng-show="twoFactor.via === \'sms\'">Re-enviar</span><span ng-show="twoFactor.via === \'app\'">Enviar via SMS</span></button><a ng-click="cancel2FA()" class="txtbtn danger">Cancelar</a></div><div class="form-group"> <label for="token">Código de verificación</label><input id="login_password" name="token" ng-model="token" rp-focus="rp-focus" class="form-control"/></div><div class="form-group"><input name="rememberMe" type="checkbox" ng-model="rememberMe" class="rememberMe"/><label for="rememberMe">Recordarme en este dispositivo por 30 días</label></div></div><div class="row"><div ng-show="status" class="col-xs-12 text-status"><span>{{status}}</span><br/><div ng-repeat="message in backendMessages" class="backend"><b>{{message.backend}} &#32;</b><span>{{message.message}}</span></div></div></div><div class="row"><div class="col-xs-12"><button type="submit" ng-disabled="loginForm.$invalid || ajax_loading" rp-spinner="{{ajax_loading ? 4 : null}}" class="btn btn-lg btn-submit btn-block btn-primary">Ingresar</button></div></div><p class="literal hint">Puede confirmar esta transacción en la página siguiente.</p><p class="literal">Nuevo en {{productName}}? <a href="#/register" l10n-inc="l10n-inc">Crear cuenta</a></p></form></div>--></section>');
	}
	return buf.join("");
	}

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(80);

	module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
	attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
	var buf = [];
	with (locals || {}) {
	var interp;
	buf.push('<section ng-controller="RecoverCtrl" class="col-xs-12 content"><div class="row auth-form-container col-sm-offset-2 col-sm-8 col-md-offset-3 col-md-6"><div class="auth-form-wrapper"><form name="recoverForm" ng-submit="submitForm()" ng-show="mode === \'recover\'"><h2>Recuperar cuenta</h2><div class="auth-attention text-center"><div class="status">Sólo se puede recuperar la cuenta DineX con la clave secreta. Recuperará su nombre DineX, contactos y otra información.</div></div><div class="form-group"><label for="recover_username">Nombre Dinex</label><div class="input-group"><span class="input-group-addon ripple-addon">~</span><input id="recover_username" name="recover_username" type="text" ng-model="username" required="required" rp-focus="rp-focus" autocomplete="off" maxlength="20" rpDest="rpDest" class="form-control"/></div></div><div class="form-group"><label for="recover_masterkey">Clave secreta</label><input id="recover_masterkey" name="recover_masterkey" type="password" autocomplete="off" required="required" ng-model="masterkey" class="form-control"/></div><div ng-show="recoverError" class="error text-center"><div>No fue posible recuperar la cuenta.</div><div ng-bind="recoverError"></div></div><div class="submit-btn-container"><button type="submit" ng-disabled="recoverForm.$invalid || submitLoading" rp-spinner="{{submitLoading ? 4 : null}}" class="btn btn-block btn-success"><span ng-show="submitLoading">Cargando...</span><span ng-hide="submitLoading">Recuperar cuenta</span></button></div></form><form name="setPasswordForm" ng-submit="submitForm()" ng-show="mode === \'setPassword\'"><h2>Establecer contraseña</h2><div class="auth-attention text-center"><div class="status">Su cuenta fue recuperada exitosamente. Por favor asegure su cuenta con una nueva contraseña.</div></div><div class="form-group"><label>Nombre Dinex</label><div class="rippleName"><span>~</span><span ng-bind="username"></span></div></div><div ng-class="{\'field-error\': \'weak\' === strength || \'match\' === strength}" class="form-group"><label for="password1">Contraseña</label><input id="password1" name="password1" type="password" autocomplete="off" ng-model="password1" rp-strong-password="rp-strong-password" required="required" rp-focus="rp-focus" rp-same-in-set="passwordSet" class="form-control"/><p ng-show="strength==\'weak\'"><span>Su contraseña es débil. No contiene números y símbolos o es muy corta.</span></p><p ng-show="strength==\'match\'"><span>Su nombre Dinex y contraseña no pueden coincidir. Por favor cree una nueva contraseña.</span></p></div><div ng-class="{\'field-error\': setPasswordForm.password1.$error.rpSameInSet &amp;&amp; setPasswordForm.password2.$dirty}" class="form-group"><label for="password2">Confirmar contraseña</label><input id="password2" name="password2" autocomplete="off" type="password" ng-model="password2" required="required" rp-same-in-set="passwordSet" class="form-control"/><p ng-show="setPasswordForm.password1.$error.rpSameInSet &amp;&amp; setPasswordForm.password2.$dirty"><span>Contraseñas no coinciden</span></p></div><div ng-show="passwordError" class="error text-center"><div>No fue posible cambiar su contraseña.</div><div ng-bind="passwordError"></div></div><div class="submit-btn-container"><button type="submit" ng-disabled="setPasswordForm.$invalid || submitLoading" rp-spinner="{{submitLoading ? 4 : null}}" class="btn btn-block btn-success"><span ng-show="submitLoading">Actualizando...</span><span ng-hide="submitLoading">Establecer contraseña</span></button></div></form></div><div class="switch-mode-link-container">¿Recuerda su contraseña? <a href="#login" l10n-inc="l10n-inc"> Ingresar</a></div></div></section>');
	}
	return buf.join("");
	}

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(80);

	module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
	attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
	var buf = [];
	with (locals || {}) {
	var interp;
	buf.push('<section ng-controller="BalanceCtrl" class="col-xs-12 content"><group ng-hide="connected" class="disconnected"><p class="literal">Debe estar online para ver esta pantalla</p></group><group ng-hide="!connected || loadState.account" class="disconnected"><p class="literal">Cargando...</p></group><div ng-show="\'web\' === client &amp;&amp; !loadingAccount &amp;&amp; !account.Balance &amp;&amp; loadState.account &amp;&amp; connected"><div class="auth-attention banner"><h4>Bienvenido a Dinex! Para activar su cuenta debe hacer un depósito inicial.</h4><ul><li> </li><li> </li></ul></div></div><group ng-show="connected &amp;&amp; loadState.account"><div ng-show="showAnnouncement" class="auth-attention banner"><h4>Aquí puedes ver el saldo e historial de tu cuenta</h4><ul><li> Ingresa a la pestaña historial y verás un listado de los pagos recibidos.</li><li> En la sección retirar podrás pedir la transferencia de fondos de tu cuenta DineX a tu cuenta bancaria. Los fondos estarán disponibles al día siguiente.</li><li> En el ícono del engranaje puedes ver la configuración de tu cuenta. La campana te notificará cuando hayas recibido un pago.</li><li> Eso es todo! Simple, rápido y seguro :)</li></ul></div><div class="row"><div class="col-xs-12 col-xs-8"><div ng-show="account.Balance" class="currency-overview"><div ng-repeat="entry in balances" ng-class="\'currency-\' + (entry.total | rpcurrency | lowercase)" class="balancebox currency-non-native"><div class="total row"><div class="lbl col-xs-8"><i style="color:#22a301" ng-class="\'fa-\' + (entry.total | rpcurrency | lowercase)" class="icon fa fa-money"></i><span rp-currency="entry.total" rp-currency-short="rp-currency-short" style="color:#22a301"></span></div><div class="balance col-xs-4">{{ entry.total | rpamount:{rel_precision: 0} }}</div></div><div ng-repeat="(issuer, component) in entry.components" ng-show="entry.show" class="component row"><div class="head"><div ng-show="component.gateway.app" class="lbl col-xs-8">{{component.gateway.app.name}}<span ng-hide="true" class="status unverified">Sin verificar</span></div><div ng-hide="component.gateway.app" rp-pretty-issuer="issuer" rp-pretty-issuer-contacts="userBlob.data.contacts" class="lbl col-xs-8"></div><div class="balance col-xs-4">{{ component | rpamount:{rel_precision: 0} }}</div></div><form ng-show="component.window == \'withdraw\'" class="withdraw"><div ng-show="!step || step==1" class="step1"><div class="row"><div class="col-xs-12 col-sm-6 col-md-6"><label for="send_destination">Enter bitcoin address.</label><input id="send_destination" name="send_destination" type="text" class="form-control"/></div><div class="col-xs-12 col-sm-6 col-md-6"><label for="send_amount">Ingrese monto a retirar.</label><input id="send_amount" name="send_amount" type="text" class="form-control"/></div></div><div class="row errorGroups"><div rp-errors="send_destination" class="col-xs-12 col-sm-6 col-md-6 errorGroup"><div rp-error-valid="rp-error-valid" class="success"></div><div rp-error-on="required" class="error">Enter a valid bitcoin address</div><div rp-error-on="invalid" class="error">Enter a valid bitcoin address</div></div><div rp-errors="send_amount" class="col-xs-12 col-sm-6 col-md-6 errorGroup"><div rp-error-valid="rp-error-valid" class="success"></div><div rp-error-on="invalid" class="error">Ingrese un monto válido</div></div></div><div class="row"><div class="col-xs-12 col-sm-4 col-md-3"><button type="submit" ng-disabled="" ng-click="step=2" class="btn btn-block btn-success submit">Retirar</button></div></div></div><div ng-show="step==2" class="step2"><label>You are sending<span class="amount"> 1.2345</span> BTC to:</label><div class="btc_address">1agizZ31TmpachYAuG3n56XCb1R5vc3cTQ</div><div class="row"><div class="col-xs-12 col-sm-3"><button ng-click="step=1" class="btn btn-block btn-default">Volver</button></div><div class="col-xs-12 col-sm-3"><button type="submit" ng-disabled="" ng-click="step=3" class="btn btn-block btn-success submit">Confirmar</button></div></div></div><div ng-show="step==3" class="step3"><div class="row"><div class="col-xs-12 col-sm-6"><div class="message type-offline">Offline</div><div class="message type-success">Transacción exitosa</div><div class="message type-warning">Atención</div><div class="message type-error">Transacción fallida</div><div class="message type-info">Mensaje</div></div></div><div class="row"><div class="col-xs-12 col-sm-3"><button ng-click="step=1" class="btn btn-block btn-default">Volver</button></div></div></div></form></div></div></div></div></div></group></section>');
	}
	return buf.join("");
	}

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(80);

	module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
	attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
	var buf = [];
	with (locals || {}) {
	var interp;
	buf.push('<section ng-controller="HistoryCtrl" class="col-xs-12 content"><group ng-hide="connected" class="disconnected"><p class="literal">Debe estar online para ver esta pantalla</p></group><group ng-hide="!connected || loadState.transactions" class="disconnected"><p class="literal">Cargando historial...</p></group><div ng-show="\'web\' === client &amp;&amp; !loadingAccount &amp;&amp; !account.Balance &amp;&amp; loadState.account &amp;&amp; connected"><div class="auth-attention banner"><h4>Bienvenido a Dinex! Para activar su cuenta debe hacer un depósito inicial.</h4><ul><li> </li><li> </li></ul></div><p class="literal">El historial de su cuenta está vacío</p><p><a href="#/balance" class="btn btn-default">Volver al balance</a></p></div><group ng-show="connected &amp;&amp; loadState.transactions &amp;&amp; account.Balance" class="row"><div class="filters row-padding-small col-sm-3"><h3>Filtros</h3><div class="filter date-filter"><a href="" ng-click="showFilterDate=!showFilterDate" class="filter-title">Fecha <div ng-hide="showFilterDate" class="fa fa-caret-right"></div><div ng-show="showFilterDate" class="fa fa-caret-down"></div></a><div ng-show="showFilterDate"><div class="filter-description">Cargar historial para un rango de fechas</div><form ng-submit="submitDateRangeForm()" class="filter-choices"><div class="input-group"><div class="input-group-addon"><i class="fa fa-calendar">Desde</i></div><input type="text" rp-datepicker="rp-datepicker" ng-model="dateMinView" readonly="readonly" class="form-control"/></div><div class="input-group"><div class="input-group-addon"><i class="fa fa-calendar">Hasta</i></div><input type="text" rp-datepicker="rp-datepicker" ng-model="dateMaxView" readonly="readonly" class="form-control"/></div><button type="submit" class="btn btn-block btn-primary submit">Filtro</button></form></div></div><div class="filter amount-filter"><a href="" ng-click="showFilterMinAmount=!showFilterMinAmount" class="filter-title">Monto mínimo<div ng-hide="showFilterMinAmount" class="fa fa-caret-right"></div><div ng-show="showFilterMinAmount" class="fa fa-caret-down"></div></a><form ng-submit="submitMinimumAmountForm()" ng-show="showFilterMinAmount" class="filter-choices row form-group"><div class="col-xs-8"><input type="text" ng-model="filters.minimumAmount" class="form-control"/></div><div class="col-xs-4"><button type="submit" class="btn btn-block btn-primary submit">Filtro</button></div></form></div></div><div class="transactions col-sm-9"><h3>Historial de transacciones</h3><div class="head"><div class="type"></div><div class="i"></div><div class="dt">Fecha</div><div class="desc">Descripción</div></div><div ng-hide="historyState==\'loading\' || historyShow" class="message">Lo sentimos, no hay transacciones que coincidan con el filtro indicado.</div><ul><li ng-repeat="entry in historyShow track by entry.hash" ng-click="details[entry.hash] = !details[entry.hash]" ng-class="{open: details[entry.hash]}" ng-class-odd="\'odd\'" rp-pretty-amount-date="entry.dateRaw" class="{{entry.transaction.type}}"><div class="info"><span class="type">&nbsp;</span><span ng-hide="entry.details" class="i"><i ng-show="entry.transaction.type==\'received\'" class="fa fa-arrow-down"></i><i ng-show="entry.transaction.type==\'sent\'" class="fa fa-arrow-up"></i><i ng-show="entry.transaction.type==\'trusted\'" class="fa fa-download fa-rotate-90"></i><i ng-show="entry.transaction.type==\'trusting\'" class="fa fa-download fa-rotate-270"></i><i ng-show="!entry.transaction.type || entry.transaction.type==\'offernew\' || entry.transaction.type==\'offercancel\' || entry.transaction.type==\'exchange\' || entry.transaction.type==\'rippling\'" class="fa fa-exchange"></i><i ng-show="entry.transaction.type==\'accountset\'" class="fa fa-cogs"></i><i ng-show="entry.transaction.type==\'failed\'" class="fa fa-exclamation-triangle"></i></span><span ng-show="entry.details" class="i"><i class="fa fa-arrow-down"></i></span><span class="dt">{{entry.date | date:\'MMM d, h:mm:ss a\'}}</span><span ng-hide="entry.details" ng-switch on="entry.transaction.type" class="desc"><span ng-switch-when="sent"><span rp-span-spacing="rp-span-spacing">Enviaste<span rp-pretty-amount="entry.transaction.amount" class="amount"></span>a<span title="{{entry.transaction.counterparty}}" class="address">{{entry.transaction.counterparty | rpcontactnamefull | rpripplename: {tilde: true} }}</span></span>');
	var __val__ = __webpack_require__(79)()
	buf.push(null == __val__ ? "" : __val__);
	buf.push('</span><span ng-switch-when="received"><span rp-span-spacing="rp-span-spacing"><span title="{{entry.transaction.counterparty}}" class="address">{{entry.transaction.counterparty | rpcontactnamefull | rpripplename: {tilde: true} }}</span>te envio<span rp-pretty-amount="entry.transaction.amount" class="amount"></span></span>');
	var __val__ = __webpack_require__(79)()
	buf.push(null == __val__ ? "" : __val__);
	buf.push('</span><span ng-switch-when="exchange"><span rp-span-spacing="rp-span-spacing">No se puede realizar la operación.</span>');
	var __val__ = __webpack_require__(79)()
	buf.push(null == __val__ ? "" : __val__);
	buf.push('</span><span ng-switch-when="trusted"><span rp-span-spacing="rp-span-spacing"><span title="{{entry.transaction.counterparty}}" class="address">{{entry.transaction.counterparty | rpcontactnamefull | rpripplename: {tilde: true} }}</span>now trusts you for<span rp-pretty-amount="entry.transaction.amount" class="amount"></span></span>');
	var __val__ = __webpack_require__(79)()
	buf.push(null == __val__ ? "" : __val__);
	buf.push('</span><span ng-switch-when="trusting"><span rp-span-spacing="rp-span-spacing">Activacion de cuenta<!--span.address(rp-pretty-identity="entry.transaction.counterparty")--><!--| for--><!--span.amount(rp-pretty-amount="entry.transaction.amount")--></span>');
	var __val__ = __webpack_require__(79)()
	buf.push(null == __val__ ? "" : __val__);
	buf.push('</span><span ng-switch-when="offernew"><span ng-show="entry.transaction.sell" rp-span-spacing="rp-span-spacing">No se puede realizar la operación.</span><span ng-hide="entry.transaction.sell" rp-span-spacing="rp-span-spacing">No se puede realizar la operación.</span>');
	var __val__ = __webpack_require__(79)()
	buf.push(null == __val__ ? "" : __val__);
	buf.push('</span><span ng-switch-when="offercancel"><span rp-span-spacing="rp-span-spacing">No se puede realizar la operación.</span>');
	var __val__ = __webpack_require__(79)()
	buf.push(null == __val__ ? "" : __val__);
	buf.push('</span><span ng-switch-when="accountset"><span>Los detalles de la cuenta han sido modificados</span>');
	var __val__ = __webpack_require__(79)()
	buf.push(null == __val__ ? "" : __val__);
	buf.push('</span><span ng-switch-when="rippling"><span>Calculando</span>');
	var __val__ = __webpack_require__(79)()
	buf.push(null == __val__ ? "" : __val__);
	buf.push('</span><span ng-switch-when="failed">Transacción fallida</span><span ng-switch-default="ng-switch-default">');
	var __val__ = __webpack_require__(79)()
	buf.push(null == __val__ ? "" : __val__);
	buf.push('</span></span><span ng-show="entry.details" ng-switch on="entry.details.type" class="desc"><span ng-switch-when="giveaway"><span rp-span-spacing="rp-span-spacing"><span>{{entry.details.app.name}}</span> sent you<span rp-pretty-amount="entry.transaction.amount" class="amount"></span> and activated your account!</span>');
	var __val__ = __webpack_require__(79)()
	buf.push(null == __val__ ? "" : __val__);
	buf.push('</span><span ng-switch-when="deposit"><span rp-span-spacing="rp-span-spacing">Ha depositado <span rp-pretty-amount="entry.transaction.amount" class="amount"></span> usando {{entry.details.app.name}}</span>');
	var __val__ = __webpack_require__(79)()
	buf.push(null == __val__ ? "" : __val__);
	buf.push('</span></span></div><!--.details(ng-if="details[entry.hash]")<div ng-show="entry.balanceEffects" class="effects"><div class="title">Cambios en el balance</div><div class="effect header"><span class="description">Descripción</span><span class="issuer">Emisor</span><span class="amount">Monto</span><span class="balance">Balance final</span></div><div ng-repeat="effect in entry.balanceEffects" class="effect"><span class="description"><span ng-show="effect.type == \'balance_change\'" data-label="Description">Sin información.</span><span ng-show="effect.type == \'trust_change_balance\'" data-label="Description">{{effect.currency}} Cambios en el balance</span><span ng-show="effect.type == \'fee\'" data-label="Description">Comisión</span></span><span rp-pretty-issuer="effect.amount.issuer().to_json()" rp-pretty-issuer-contacts="userBlob.data.contacts" rp-pretty-issuer-default="-" data-label="Issuer" class="issuer"></span><span data-label="Amount" rp-pretty-amount="effect.amount" class="amount"></span><span data-label="Final balance" rp-pretty-amount="effect.balance" class="balance"></span></div></div><div class="links"><a rp-link-tx="entry.hash" class="txLink">Detalles de transacción</a><a href="#/contact?to={{entry.transaction.counterparty}}" rp-no-propagate="rp-no-propagate" ng-show="entry.transaction.counterparty &amp;&amp; !(entry.transaction.counterparty | rponlycontactname)" class="addLink">Añadir <strong> {{entry.transaction.counterparty | rpcontactname}}</strong> a contactos</a></div>--></li></ul><div class="foot"><div ng-show="historyState==\'loading\'">Cargando...</div><a ng-show="historyState==\'ready\'" href="" ng-click="loadMore()" class="loadmore">Cargar más</a><div ng-show="historyState==\'full\'">No quedan más transacciones</div></div></div></group></section><!-- TODO filter calendar: High/low limits.--><!-- TODO filter calendar: High limit calculation after the low limit--><!-- TODO we loose history after tab Change--><!-- TODO problem when manually editing date filter input field--><!-- TODO currency filter to work with also trust type--><!-- TODO optimization.. double (triple on load more) update history-->');
	}
	return buf.join("");
	}

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(80);

	module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
	attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
	var buf = [];
	with (locals || {}) {
	var interp;
	buf.push('<section ng-controller="AccountCtrl" class="col-xs-12 content"><div ng-show="connected" class="row"><div ng-show="\'web\' === client &amp;&amp; !loadingAccount &amp;&amp; !account.Balance &amp;&amp; loadState.account &amp;&amp; connected"><div class="auth-attention banner"><h4>Bienvenido a Dinex! Para activar su cuenta debe hacer un depósito inicial.</h4><ul><li> </li><li> </li></ul></div></div><div class="col-sm-3"><div class="info"><a href="" ng-click="infoPage = \'public\'" ng-class="{active: infoPage == \'public\'}">Información pública</a></div></div><div class="col-sm-9 list"><div ng-show="\'web\' === client"><div ng-show="infoPage == \'public\'" class="showPublic"><div ng-show="loading" class="alert alert-warning">Cambiando su nombre de DineX...</div><div ng-show="success" class="alert alert-success">Su nombre DineX ha sido cambiado con éxito.</div><h4>Configuración de cuenta</h4><div ng-show="showAnnouncement" class="auth-attention banner"><h5>Editar nombre DineX está desactivado en la cuenta demo por seguridad.</h5></div><div class="section"><div class="descriptor">Nombre DineX</div><div class="row"><div class="col-xs-12 col-sm-3 username">~{{userCredentials.username}}</div><div class="col-xs-12 col-sm-9"><a href="" ng-hide="openForm">editar</a></div><form id="renameForm" name="renameForm" ng-show="openForm" ng-submit="rename()"><div id="open_name_change" class="form-group"><label for="name">Nuevo nombre DineX</label><div class="input-group"><span class="input-group-addon ripple-addon">~</span><input id="username" name="username" type="text" ng-model="username" required="required" rp-focus="rp-focus" autocomplete="off" maxlength="20" rpDest="rpDest" rp-available-name="rp-available-name" rp-available-name-invalid-reason="usernameInvalidReason" rp-available-name-reserved-for="usernameReservedFor" rp-loading="usernameLoading" class="form-control"/></div><div rp-errors="username" ng-hide="usernameLoading" class="errorGroup"><div rp-error-valid="rp-error-valid" class="success">Disponible</div><div rp-error-on="rpAvailableName" class="error"><span ng-switch on="usernameInvalidReason"><span ng-switch-when="exists">Ya registrado!</span><span ng-switch-when="reserved">Reservado para {{usernameReservedFor}}<span>&#32;</span><i rp-popover="rp-popover" rp-popover-placement="bottom" rp-popover-title="Reserved domain" rp-popover-trigger="click" ng-switch-when="reserved" data-content="This name belongs to a high-traffic website and has been reserved to prevent phishing." class="fa fa-question-circle"></i></span><span ng-switch-when="tooshort">Debe tener al menos dos caracteres</span><span ng-switch-when="toolong">Debe tener como máximo 20 caracteres</span><span ng-switch-when="charset">Solo a-z, 0-9 y guión (-)</span><span ng-switch-when="starthyphen">No puede empezar por guión (-)</span><span ng-switch-when="endhyphen">No puede terminar en guión (-)</span><span ng-switch-when="multhyphen">No puede enlazar guiones (--)</span></span></div></div><span ng-show="usernameLoading">Comprobando...</span><div class="form-group"><label type="password" for="password">Contraseña actual</label><input id="password" type="password" name="password" ng-model="password" required="required" class="form-control"/></div><div ng-show="error" ng-switch on="error" class="alert alert-danger"><span ng-switch-when="wrongpassword">La contraseña ingresada es incorrecta.</span><span ng-switch-when="cantlogin">Su nombre DineX ha cambiado. Por favor ingrese nuevamente.</span><span ng-switch-default="ng-switch-default">No se ha podido cambiar su nombre DineX, por favor intente más tarde.</span></div><div class="row"><div class="col-xs-12 col-sm-6"><button type="submit" ng-disabled="renameForm.$invalid || loading" class="btn btn-success btn-block"><span ng-hide="loading">Enviar</span><span ng-show="loading">Cargando...</span></button></div><div class="col-xs-12 col-sm-6"><a href="" ng-click="openForm=!openForm" class="txtbtn">Cancelar</a></div></div></div></form></div></div></div></div></div></div></section>');
	}
	return buf.join("");
	}

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(80);

	module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
	attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
	var buf = [];
	with (locals || {}) {
	var interp;
	buf.push('<section ng-controller="SecurityCtrl" class="col-xs-12 content"><div ng-show="connected" class="row"><div ng-hide="isUnlocked" class="col-xs-12"><div class="auth-attention sessionUnlock"><h5>Sesión expirada</h5><div class="status">Para ver o editar sus preferencias de seguridad, debe tener una sesión activa.</div><div class="row"><div class="col-xs-12 col-sm-5"><form ng-submit="restoreSession()"><label for="sessionPassword">Contraseña</label><input id="sessionPassword" type="password" name="sessionPassword" ng-model="sessionPassword" rp-focus="rp-focus" class="form-control"/><button type="submit" ng-disabled="isConfirming" rp-spinner="{{isConfirming ? 4 : null}}" class="btn btn-primary btn-block"><span>Restaurar sesión</span></button></form></div></div></div><div ng-show="unlockError" class="alert alert-danger"><span>La contraseña ingresada es incorrecta.</span></div></div><div ng-show="\'web\' === client &amp;&amp; !loadingAccount &amp;&amp; !account.Balance &amp;&amp; loadState.account &amp;&amp; connected"><div class="auth-attention banner"><h4>Bienvenido a Dinex! Para activar su cuenta debe hacer un depósito inicial.</h4><ul><li> </li><li> </li></ul></div></div><div ng-show="isUnlocked" class="col-sm-3"><div class="settingPage"><a href="#/security" ng-class="{active: $route.current.tabName == \'security\'}">Seguridad</a></div></div><div ng-show="isUnlocked" class="col-sm-9 list"><div ng-show="settingsPage == \'security\'" class="showSecurity"><div ng-show="\'web\' === client"><div ng-show="loading" class="alert alert-warning">Cambiando su contraseña DineX...</div><div ng-show="success" class="alert alert-success">Su contraseña DineX se ha modificado exitosamente.</div><div ng-show="errorLoading2FA" class="alert alert-danger">No es posible acceder a la configuración de autentificación de dos factores.</div><div ng-show="error2FA" class="alert alert-danger">Error al guardar la configuación de autentificación de dos factores.</div><div ng-show="invalidToken" class="alert alert-danger">El código de verificación es invalido.</div><div ng-show="enableSuccess" class="alert alert-success">La autentificación de dos factores se ha activado.</div><div ng-show="disableSuccess" class="alert alert-success">La autentificación de dos factores se ha desactivado.</div><h4>Preferencias de seguridad</h4><div ng-show="showAnnouncement" class="auth-attention banner"><h5>Cambio de contraseña y ver clave secreta está desactivado en la cuenta demo por seguridad.</h5></div><!--.section<div class="descriptor">Autentificación de dos factores</div><div ng-show="loading2FA" class="row"><div class="col-xs-12 col-sm-9"><div rp-spinner="4">Cargando la configuración de autentificación de dos factores...</div></div></div><div ng-hide="loading2FA || errorLoading2FA || mode2FA === \'verifyPhone\'" class="row"><div class="col-xs-9 col-sm-8 col-md-6"><span ng-show="enabled2FA">Habilitado</span><span ng-hide="enabled2FA">Deshabilitado</span></div><div class="col-xs-3 col-sm-4 col-md-6"><a href="" ng-show="enabled2FA" ng-click="disable2FA()">desabilitar</a><rp-popup onOpen="open2FA"><a href="" rp-popup-link="rp-popup-link" ng-hide="enabled2FA">habilitar</a><div rp-popup-content="rp-popup-content" class="connectModal modal2FA"><div class="modal-header"><div id="logo" class="navbar-brand hidden-sm modal-logo"></div><div class="modal-title">Conectar</div></div><div class="modal-body"><div class="modal-prompt">Authy provee el servicio de autentificción de dos factores para DineX. Para habilitar la autentificación, debes compartir información con Authy.</div><div class="grey-focus"><div class="row modal-permissions"><div class="col-xs-12 col-sm-4">- Tu Email:</div><div class="col-xs-12 col-sm-8 email">{{userBlob.data.email}}</div></div><div class="row modal-permissions"><div class="col-xs-12 col-sm-4">- Tu número de teléfono:</div><div class="col-xs-12 col-sm-8 phone2FA"><div class="form-group authy-control"><label>Código de país</label><input ng-model="countryCode" class="authy-countries form-control"/></div><div class="form-group authy-control"><label>Número de teléfono</label><input name="phoneNumber" ng-model="phoneNumber" class="form-control"/></div></div></div></div><div class="modal-agreement">Al continuar, aceptas los <a href="https://www.authy.com/terms" target="_blank" l10n-inc="l10n-inc"> términos de servicio</a> de Authy.</div><div class="modal-buttons"><button ng-click="savePhone()" ng-disabled="savingPhone" class="modal-btn btn btn-default btn-primary btn-md"><span>Compartir</span></button><button data-dismiss="modal" ng-hide="savingPhone" class="modal-btn btn btn-default btn-md">Cancelar</button></div></div></div></rp-popup></div></div><div ng-hide="!mode2FA || mode2FA === \'verifyPhone\'" class="row confirm2FA"><div class="col-xs-12 col-sm-9"><div class="status"><div rp-spinner="4" ng-show="mode2FA === \'savePhone\'">Guardando preferencias...</div><div rp-spinner="4" ng-show="mode2FA === \'disable\'">Deshabilitando autentificación de dos factores...</div><div rp-spinner="4" ng-show="mode2FA === \'enable\'">Habilitando autentificación de dos factores...</div></div></div></div><form ng-show="mode2FA === \'verifyPhone\'" class="verify2FA"><div class="row"><div class="col-xs-12"><div class="status"><span ng-hide="via === \'app\'">Por favor ingrese el código de verificaión del SMS enviado a su teléfono:</span><span ng-show="via === \'app\'">Por favor ingrese el código de verificación de la aplicación instalada en su dispositivo.</span><span> +{{currentCountryCode}} {{currentPhone}}</span><div l10n-inc="l10n-inc">Enter the code below to complete the process.</div></div></div></div><div class="row"><div class="col-xs-12 col-sm-8"><label for="verifyToken">Código de verificación</label></div></div><div class="row"><div class="col-xs-7 col-sm-5"><input id="verifyToken" name="verifyToken" ng-model="verifyToken" class="form-control"/></div><div class="col-xs-5 col-sm-3"><button type="button" ng-disabled="isRequesting" rp-spinner="{{isRequesting ? 4 : null}}" ng-click="requestToken()" class="btn btn-default btn-block"><span ng-hide="via === \'app\'">Re-enviar código</span><span ng-show="via === \'app\'">Enviar via SMS</span></button></div></div><div class="row"><div class="col-xs-7 col-sm-3"><button type="button" ng-disabled="isVerifying" ng-click="enable2FA()" rp-spinner="{{isVerifying ? 4 : null}}" class="btn btn-primary btn-block"><span>Habilitar</span></button></div><div class="col-xs-5 col-sm-2"><a ng-click="cancel2FA()" class="txtbtn">Cancelar</a></div></div></form>--><div class="section"><div class="descriptor">Contraseña DineX</div><div class="row"><div class="col-xs-9 col-sm-8 col-md-6">*****************</div><div class="col-xs-3 col-sm-4 col-md-6"><a href="" ng-hide="openFormPassword">editar</a></div></div><div class="row"><div class="row"><div class="auth-form-container col-xs-12 col-md-8 col-lg-6"><form id="renameForm" name="changeForm" ng-show="openFormPassword" ng-submit="changePassword()"><div class="form-group"><label type="password" for="password">Contraseña actual</label><input id="password" type="password" name="password" rp-focus="rp-focus" ng-model="password" required="required" class="form-control"/></div><div ng-show="error" ng-switch on="error" class="alert alert-danger"><span ng-switch-when="wrongpassword">La contraseña ingresada es incorrecta.</span><span ng-switch-when="cantlogin">Su contraseña DineX ha cambiado, por favor ingrese nuevamente</span><span ng-switch-default="ng-switch-default">No fue posible cambiar su contraseña DineX, por favor intente más tarde.</span></div><div ng-class="{\'field-error\': \'weak\' === strength || \'match\' === strength}" class="form-group"><label for="change_password">Nueva contraseña</label><input name="change_password1" type="password" autocomplete="off" ng-model="password1" rp-strong-password="rp-strong-password" required="required" rp-same-in-set="passwordSet" class="form-control"/><p ng-show="strength==\'weak\'"><span>Su contraseña es débil. No contiene números y símbolos o es muy corta.</span></p><p ng-show="strength==\'match\'"><span>Su nombre Dinex y contraseña no pueden coincidir. Por favor cree una nueva contraseña.</span></p></div><div ng-class="{\'field-error\': changeForm.change_password1.$error.rpSameInSet &amp;&amp; changeForm.change_password2.$dirty}" class="form-group"><label for="change_password2">Confirmar contraseña</label><input name="change_password2" autocomplete="off" type="password" ng-model="password2" required="required" rp-same-in-set="passwordSet" class="form-control"/><p ng-show="changeForm.change_password1.$error.rpSameInSet &amp;&amp; changeForm.change_password2.$dirty"><span>Contraseñas no coinciden</span></p></div><div ng-show=""><div class="form-group"><div class="strength {{strength}}">{{strength}}</div></div></div><div class="row"><div class="col-xs-12 col-sm-6"><button type="submit" ng-disabled="changeForm.$invalid || loading" class="btn btn-success btn-block"><span ng-hide="loading">Enviar</span><span ng-show="loading">Cargando...</span></button></div><div class="col-xs-12 col-sm-6"><a href="" ng-click="openFormPassword=!openFormPassword" class="txtbtn">Cancelar</a></div></div></form></div></div></div></div><div class="section"><div class="descriptor">Clave secreta</div><div class="row"></div><label>La clave secreta desbloquea el acceso a los fondos de la cuenta aún cuando olvide su nombre de usuario DineX o su contraseña. Por favor escríbala y guardela en un lugar PRIVADO Y SEGURO. Puede emplearla para recuperar sus fondos.</label><div class="row"><div class="col-xs-9 col-sm-8 col-md-6"><span ng-show="security.master_seed" class="value">{{security.master_seed}}</span><span ng-hide="security.master_seed" class="value">••••••••••••••••••••••••••••••••••••••••••••</span></div><div class="col-xs-3 col-sm-4 col-md-3"><a href="">Mostrar</a><a href="" ng-click="security.master_seed = null" ng-show="security.master_seed">Ocultar</a></div></div></div><!--.descriptor(l10n) Password protection for transactions--><!--.row<div class="col-xs-12"><div class="description">Si deshabilita las solicitudes de contraseña, aún así deberá ingresarla en ciertos casos.</div><div class="helperInput"><form name="persistUnlock" ng-submit="setPasswordProtection()"><div ng-hide="editUnlock" class="row"><div class="col-xs-6 col-sm-5 col-md-3"><div class="description">Requerir contraseña</div></div><div class="col-xs-3 col-sm-3 col-md-3"><div class="description"><div ng-show="requirePassword">Si</div><div ng-hide="requirePassword">No</div></div></div><div class="col-xs-3 col-sm-4 col-md-4"><div class="description"><a href="" id="edit" ng-click="editUnlock = true">editar</a></div></div></div><div ng-show="editUnlock" class="row"><div class="col-xs-6 col-sm-5 col-md-3"><div class="description">Requerir contraseña</div></div><div class="col-xs-3 col-sm-3 col-md-3"><div class="helperInput description"><label><input type="checkbox" name="unlock" ng-checked="requirePassword" ng-click="requirePasswordChanged = true"/></label></div></div><div class="col-xs-3 col-sm-3 col-md-2"><div class="description"><button id="save" type="submit" ng-disabled="serverForm.$invalid" class="btn btn-block btn-success btn-xs submit">Guardar</button></div></div></div></form></div></div>--></div></div></div></div></section>');
	}
	return buf.join("");
	}

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(80);

	module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
	attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
	var buf = [];
	with (locals || {}) {
	var interp;
	buf.push('<section ng-controller="TxCtrl" ng-switch on="state" class="single ddpage content"><group ng-switch-when="loading"><p class="literal throbber">Cargando de talles de transacción...</p></group><group ng-switch-when="error"><p class="literal">Ocurrió un error al cargar los detalles de transacción.</p></group><group ng-switch-when="loaded"><p class="literal hash"><span>Transacción #</span><span>{{transaction.hash}}</span><div><a href="{{\'https://ripplecharts.com/#/graph/\' + transaction.hash}}" target="_blank">Mostrar en gráfico</a></div></p><hr/><p class="literal type">Tipo de transacción: <strong> {{transaction.TransactionType}}</strong></p><group ng-switch on="transaction.TransactionType"><group ng-switch-when="Payment"><group class="clearfix"><dl class="details half"><dt><span>Enviado por</span><span>:</span></dt><dd>{{transaction.Account}}</dd><dt><span>Monto enviado</span><span>:</span></dt><dd>{{amountSent | rpamount}} {{amountSent | rpcurrency}}</dd><dt><span> </span><span>:</span></dt><dd>{{amountSent | rpcurrencyfull}}</dd></dl><dl class="details half"><dt><span>Enviado a</span><span>:</span></dt><dd>{{transaction.Destination}}</dd><dt><span>Monto recibido</span><span>:</span></dt><dd>{{transaction.Amount | rpamount}} {{transaction.Amount | rpcurrency}}</dd><dt><span> </span><span>:</span></dt><dd>{{transaction.Amount | rpcurrencyfull}}</dd></dl></group><hr/><group class="clearfix"><dl class="details half"><dt><span>Comisión de la red</span><span>:</span></dt><dd>{{transaction.Fee | rpamount}} XRP</dd></dl><dl class="details half"><group ng-show="transaction.DestinationTag !== null &amp;&amp; transaction.DestinationTag !== undefined"><dt><span>Etiqueta de destino</span><span>:</span></dt><dd>{{transaction.DestinationTag}}</dd></group></dl></group><hr/><dl class="details"><dt><span>Número de registro</span><span>:</span></dt><dd>{{transaction.inLedger}}</dd></dl></group><group ng-switch-default="ng-switch-default"><group class="clearfix"><dl class="details half"><dt>Enviado desde:</dt><dd>{{transaction.Account}}</dd></dl><dl class="details half"></dl></group><hr/><p class="literal">Lo sentimos, no hay más infromación.</p></group></group></group></section>');
	}
	return buf.join("");
	}

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(80);

	module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
	attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
	var buf = [];
	with (locals || {}) {
	var interp;
	buf.push('<section ng-controller="FundCtrl" class="col-xs-12 content"><group ng-hide="connected" class="disconnected"><p class="literal">Debe estar online para ver esta pantalla</p></group><div ng-show="\'web\' === client &amp;&amp; !loadingAccount &amp;&amp; !account.Balance &amp;&amp; loadState.account &amp;&amp; connected"><div class="auth-attention banner"><h4>Bienvenido a Dinex! Para activar su cuenta debe hacer un depósito inicial.</h4><ul><li> </li><li> </li></ul></div></div><div ng-show="connected" class="row"><div class="col-sm-3"><div class="currencies"><a href="#/fund/clp" ng-class="{active: $routeParams.currency == \'clp\'}">CLP</a></div></div><div class="col-sm-9 list"><div ng-show="$routeParams.currency == \'clp\'" class="fundXrp"><div ng-show="\'web\' === client"><div class="nameLine">Nombre DineX: <span ng-show="userCredentials.username" class="name">~{{userCredentials.username}}</span><span ng-hide="userCredentials.username">cargando...</span></div><div class="description">Use su nombre DineX para enviar y recibir transacciones.</div></div></div></div></div></section>');
	}
	return buf.join("");
	}

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(80);

	module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
	attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
	var buf = [];
	with (locals || {}) {
	var interp;
	buf.push('<section ng-controller="WithdrawCtrl" class="col-xs-12 content"><group ng-hide="connected" class="disconnected"><p class="literal">Debe estar online para ver esta pantalla</p></group><div ng-show="\'web\' === client &amp;&amp; !loadingAccount &amp;&amp; !account.Balance &amp;&amp; loadState.account &amp;&amp; connected"><div class="auth-attention banner"><h4>Bienvenido a Dinex! Para activar su cuenta debe hacer un depósito inicial.</h4><ul><li> </li><li> </li></ul></div></div><div ng-show="connected" class="row"><div class="col-sm-3"><div class="currencies"><a href="#/withdraw/dnx" ng-class="{active: $routeParams.currency == \'dnx\'}">DNX</a></div></div><div class="col-sm-9 list"><div ng-show="$routeParams.currency == \'dnx\'" class="fundXrp"><div ng-show="\'web\' === client"><div class="nameLine">Nombre DineX: <span ng-show="userCredentials.username" class="name">~{{userCredentials.username}}</span><span ng-hide="userCredentials.username">cargando...</span></div><div class="description">Para retirar el saldo de tu cuenta deberás simplemente indicar el monto que quieres retirar y a que cuenta quieres que lo depositemos o bien si quieres retirarlo en sucursal bancaria. Eso es todo :)</div></div></div></div></div></section>');
	}
	return buf.join("");
	}

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(80);

	module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
	attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
	var buf = [];
	with (locals || {}) {
	var interp;
	buf.push('<section ng-controller="EulaCtrl" class="content"><h1>Acuerdo de Licencia de Usuario Final ("EULA")</h1><hr/><p>Bienvenido al cliente de software <strong>DineX App</strong> proporcionado por DineX SpA. (en adelante "DineX", "nos" o "nosotros"). DineX App es una versión de código abierto del Cliente de software</p><a href="www.ripple.com">Ripple</a> que permite a los usuarios acceder al protocolo de transacción y red de pagos descentralizado Ripple ("Protocolo Ripple"). El código fuente del Cliente Ripple y software relacionado está disponible de forma gratuita en virtud de acuerdos de licencia de software de código abierto en<a href="https://github.com/ripple"> Ripple Github</a>.<p>Por favor, lea este Acuerdo de Licencia de Usuario Final <strong>"EULA"</strong> con cuidado ya que explica sus y nuestros respectivos derechos y responsabilidades asociados con el  acceso a, y uso de, <strong> DineX App</strong>.</p><p><strong> 1. PROTOCOLO RIPPLE</strong></p>Usted entiende que DineX App le permite interactuar directamente con el Protocolo Ripple para crear una cuenta Ripple ("Ripple Wallet"), enviar pagos a través del Protocolo, así como revisar el historial de transacciones y saldos disponibles a través del Protocolo Ripple. Dinex SpA. no posee ni controla Ripple. Ripple no posee ni controla Dinex SpA. Usted entiende que DineX App no procesa los pagos, ni mantiene el  historial de transacciones y saldos, sino que es sólo una herramienta para iniciar acciones que ocurren dentro del Protocolo Ripple y ver el registro de esas acciones. Usted entiende que los pagos reales son procesados a través del Protocolo Ripple y que los saldos resultantes que se muestran en DineX App están (i) en manos de DineX SpA. o (ii) en el caso de XRP, mantenidos a través de una cadena de custodia documentada en el libro de contabilidad pública del Protocolo Ripple ("The Ledger"). Usted reconoce y acepta que no tenemos ningún control, responsabilidad o autoridad sobre las acciones de terceros sobre "The Ledger". DineX App meramente le permite iniciar acciones que conllevan modificaciones en "The Ledger" las cuales pueden ser redimidas a través de transferencias bancarias, esto es, DineX SpA. y su servicio Dinex App sirven como un<a href="https://wiki.ripple.com/Ripple_for_Gateways">Gateway</a> al protocolo de Ripple. Para obtener más información acerca del Protocolo Ripple, por favor visite la<a href="https://ripple.com/wiki/"> Wiki de Ripple.</a> Usted reconoce y acepta que las transacciones que se inician en el Protocolo Ripple a través de DineX App estarán disponibles para el público en Internet a través de "The Ledger". DineX App le permite ver los datos de los pagos públicos publicado por las cuentas - incluyendo su propia cuenta DineX. Una vez que los datos se comparten con el Protocolo Ripple, ni Ripple, ni DineX SpA., ni ningún tercero puede censurar selectivamente el acceso o uso posterior de dichos datos.<p></p><p><strong> 2. SERVICIOS DineX</strong></p>Usted accede a los servicios de DineX a través del sitio web<a href="href" www.dinex.cl="www.dinex.cl">www.dinex.cl</a> y/o de Dinex App. Dinex es una cuenta de valor almacenado, o prepago, únicamente para el pago de servicios de transporte de pasajeros. El valor almacenado en las cuentas DineX es para uso exclusivo con este fin. El valor almacenado en las cuentas DineX es en la forma de "créditos DineX (DNX)", los cuales se compran a DineX SpA. y luego se transfieren entre usuarios del servicio. Los créditos DineX pueden ser redimidos ante DineX SpA por su valor en pesos chilenos ("CLP"). El valor de un crédito DineX (&#164 1) es de $1 peso chileno, eso es, &#164 1 DNX = $1 CLP. Este valor es inalterable. Cualquier otro uso que se dé a las transferencias de valor entre usuarios DineX no está avalado por la empresa y se comunicará a las autoridades pertinentes.<ul><li>Descripción del servicio:\nDineX es un medio de pago electrónico de valor almacenado para el pago de servicios de transporte de pasajeros. Los usuarios, ya sean compradores (en adelante "pasajeros") o proveedores del servicio de transporte (en adelante "conductores") deben crear una cuenta DineX a través de la aplicación mediante la cual podrán:<ul><li>Pasajeros: revisar el balance e historial de pagos realizados en su cuenta, realizar pagos de servicios de transporte, validar la carga de DNX mediante transferencias y/o depósitos bancarios a su cuenta DineX, añadir contactos frecuentes y solicitar el reembolso de su saldo a una cuenta bancaria. Igualmente accederá a opciones de configuración como cambio de contraseña, nombre de usuarios y otras.</li><li>Conductores: revisar el balance e historial de pagos recibidos en su cuenta y solicitar la conversión de DNX a CLP para ser depositados en una cuenta bancaria. Igualmente accederá a opciones de configuración como cambio de contraseña, nombre de usuarios y otras.</li></ul><li>Tarifas:\nLas Tarifas DineX están sujetas a cambios los cuales se avisarán con al menos 10 días de anticipación mediante correo electrónico a la dirección asociada con la cuenta al momento de su creación. Las tarifas DineX nunca aumentarán, sólo se verán reducidas a medida se integran más usuarios a la red.<ul><li>Pasajeros: Los servicios DineX son gratuitos para los usuarios pasajeros.</li><li>Conductores: A los usuarios conductores se les cobrará una comisión fija del 1% del total de créditos DNX convertidos a CLP recibidos a través de los servicios DineX. El pago de dicha comisión se verá reflejado como un descuento al total de la transferencia que se realize a la cuenta bancaria del conductor al momento de solicitar un depósito del monto en CLP convertido a partir de los créditos recibidos en su cuenta DineX.</li></ul></li><li>Cobertura territorial:\nDinex ofrece sus servicios dentro del territorio de Chile.</li><li>Opciones para cargar créditos DineX (DNX) en la cuenta de usuario DineX:\nLos usuarios pasajeros de DineX pueden cargar DNX en su cuenta de valor almacenado mendiate compra de créditos a través de transferencia bancaria a la cuenta bancaria de DineX SpA. indicada en la aplicación de cliente. Una vez realizada la transferencia se debe indicar el RUT de la cuenta de origen y el monto exacto del depósito para que el equivalente en créditos DNX sea asignado a la cuenta de usuario DineX correspondiente. Igualmente, se podrá realizar un depósito en sucursal bancaria a la cuenta bancaria de DineX SpA. en este caso se debe indicar el número del comprobante de depósito y el monto exacto del depósito para que este sea asignado a la cuenta de usuario DineX correspondiente. El usuario tiene un plazo de 24 horas para informar que realizó la transferencia o depósito. Una vez informado, DineX actualizará el saldo de la cuenta de usuario en un tiempo no mayor a 2 minutos. No se validarán los depósitos o transferencias por montos superiores al equivalente a USD$1000 en moneda nacional al momento de la transacción sin previo registro completo de los datos del usuario.</li><li>Opciones para solicitar la conversión de los créditos DineX:<ul><li>Pasajeros: Los usuarios pasajeros podrán solicitar la conversión total o parcial de su saldo DineX con posterior transferencia a una cuenta corriente sin costo alguno una vez al mes. De solicitarlo más de una vez al mes se cobrará una comisión de un 5% sobre el total transferido. La transferencia se hará efectiva la día siguiente que soliciten la operación.</li><li>Conductores: Los usuarios conductores podrán solicitar la conversión total o parcial de su saldo DineX con posterior transferencia a una cuenta corriente pagando una comisión fija de un 1% por las primeras 30 operaciones. De solicitarlo más de 30 veces en un mes se cobrará una comisión de un 5% sobre el total transferido a partir de la operación número 31. La transferencia se hará efectiva al día siguiente que soliciten la operación.</li></ul></li><li>Protección de los depósitos:\nTodo saldo DineX está respaldado por un saldo equivalente en moneda nacional en una cuenta bancaria controlada por DineX SpA. Dichos depósitos se encuentran sujetos a las mismas condiciones de protección que todo depósito bancario de acuerdo a la Ley General de Bancos.</li><li>Protección contra transacciones no autorizadas:\nCada usuario DineX es reponsable de proteger su nombre de usuario y clave secreta para acceder a su cuenta. Si estas son robadas o comunicadas a terceros DineX SpA. no se hace responsable por las transacciones no autorizadas por el creador de la cuenta DineX. Es fundamental que los usuarios guarden en un lugar seguro su clave secreta de 16 caracteres que les permite restituir su cuenta en caso de olvido del nombre de usuario o de la contraseña. En caso de robo del teléfono, los usuarios DineX pueden acceder a su cuenta a través del sitio web www.dinex.cl y modificar su clave para no comprometer sus fondos.</li><li>Regulación:\n Los servicios ofrecidos por DineX SpA. se encuentran enmarcados bajo la Ley General de Bancos que permite la emisión de instrumentos de prepago de uso cerrado a instituciones no bancarias. Igualmente, DineX SpA. informará a las autoridades cualquier actividad sospechosa que de indicios de lavado de activos u otros ilícitos de acuerdo a lo establecido en las circulares 11, 18, 35 y 49 de la Unidad de Análisis Financiero.</li><li>Servicio al cliente:\nDineX SpA. ofrece canales de comunicación digitales a sus clientes para que envíen sus consultas, dudas o reclamos. A través de nuestras cuentas en redes sociales: Twitter, Facebook y el correo electrónico info@dinex.cl</li></li></ul><p></p><p><strong> 3. DATOS CUENTA DineX</strong></p>Su cuenta DineX, incluyendo los datos privados y confidenciales accesibles en la misma, están protegidos del acceso y uso no autorizado de terceros a través de una clave secreta y contraseña en manos de usted y no de DineX. DineX no le puede ayudar en la recuperación de su clave secreta y contraseña. Es su responsabilidad mantener su clave secreta y contraseña protegidos de personas no autorizadas. DineX no es responsable de las consecuencias del acceso no autorizado a las cuentas DineX ya que por medidas de seguridad usted es el único responsable de almacenar dicha información.<p></p><p><strong> 4. BLOQUEO</strong></p>Usted entiende y acepta que podemos bloquear el uso excesivo o abusivo del cliente DineX de una dirección IP en particular en cualquier momento y por cualquier cantidad de tiempo, a nuestra discreción con el fin de asegurar la calidad de servicio y confiabilidad del sistema. Cualquier uso indiscriminado o abusivo de los servicios DineX que califique como spam o intentos de perjudicar el servicio será comunicado a las autoridades competentes. Sin embargo, si bloqueamos temporalmente el acceso desde un adirección IP particular, los datos de la cuenta y la operación de la red desde otras direcciones IP se mantienen inalterados.<p></p><p><strong> 5. USO ACEPTABLE</strong></p>Usted acepta no utilizar DineX para violar cualquier ley aplicable, contrato, o derechos de terceros al participar en cualquier transacción relacionada con productos o servicios ilegales. Usted está de acuerdo con que:<p>- No usará DineX de ninguna manera que pueda interferir, interrumpir, afectar negativamente o inhibir a otros usuarios de disfrutar plenamente de los servicios DineX, o que puedan dañar, inutilizar, sobrecargar o deteriorar el funcionamiento de DineX o la red de pagos Ripple de ninguna manera;</p><p>- No intenetará evitar cualquier técnica de seguridad que empleamos, o intentar acceder a cualquier servicio o área de DineX que no está autorizado a acceder;</p><p>- No introducirá en DineX o la red de pagos Ripple cualquier virus, gusano troyanos, bomba lógicas u otro material dañino; y</p><p>- No alentará o inducirá a terceros a participar en cualquiera de las actividades prohibidas por la presente Sección.</p><p><strong> 6. QUEJAS DE COPYRIGHT</strong></p>Si usted cree que cualquier cosa en DineX infringe cualquier copyright que usted posee o controla, puede presentar una notificación sobre dicha infracción a nuestro correo electrónico dinex@dinex.cl<p></p><p><strong> 7. LIMITACIÓN DE RESPONSABILIDAD</strong></p><p>(A) El acceso a DineX mediante la aplicación o el sitio web depende de la conexión a internet de los usuarios. DineX SpA. no es reponsable por limitaciones de acceso al servicio debido a problemas de conectividad a internet. Las transacciones realizadas a través de DineX son válidas en cuanto al red haya enviado la señal de confirmación de la transacción. En caso contrario no se actualizarán los saldos y la transacción no se considerará como realizada.</p><p>(B) En la medida máxima permitida por la ley aplicable, en ningún caso la indemnización total a pagar por de Dinex SpA ya sea en contrato, garantía, agravio (incluyendo negligencia, ya sea activa, pasiva o derivadda), responsabilidad del producto, responsabilidad estricta u otra teoría derivada de, o relacionada con, el uso o la imposibilidad de uso de los servicios Dinex excederá el saldo promedio de la cuenta en cuestión durante los 30 días anteriores al hecho.</p><p><strong> 8. CONTROVERSIAS; INDEMNIZACIÓN</strong></p>Usted accede a (i) que cualquier demanda, causa de acción y controversia ("Demanda") que surja de o esté relacionada con este Acuerdo o su uso está gobernada por la ley Chilena, independientemente de su ubicación o de cualquier conflicto o elección del principio de la ley; (ii) que cualquier reclamación debe ser resuelta exclusivamente por un tribunal Chileno; (iii) someterse a la jurisdicción personal de dichos tribunales; (d) que cualquier reclamación presentada a más tardar 1 año después de los hechos que dieron lugar a dicha reclamación quedan exentos y deberán ser para siempre borrados.<p></p><p><strong> 9. OTROS TÉRMINOS</strong></p>Este EULA contiene el acuerdo completo y sustituye cualquier acuerdo previo y comprensiones contemporáneas entre las partes acerca de DineX. Este EULA no altera los términos y condiciones de cualquier otro acuerdo que pueda tener con nosotros para cualquier otro producto o servicio o de otro modo. En caso de cualquier conflicto entre este Acuerdo y cualquier otro acuerdo que pueda tener con nosotros, los términos de ese otro acuerdo reemplazarán este EULA sólo si se encuentra específicamente identificado y declarado ser anulado por dicho acuerdo. Nuestro incumplimiento o retraso en el ejercicio de cualquier derecho, poder o privilegio en virtud de este EULA no operará como una renuncia a los mismos. La invalidez o inejecutabilidad de cualquier término de este Acuerdo no afectará la validez o exigibilidad de cualquier otro término de este EULA, todos los cuales permanecerán en pleno vigor y efecto.</section>');
	}
	return buf.join("");
	}

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(80);

	module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
	attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
	var buf = [];
	with (locals || {}) {
	var interp;
	buf.push('<section ng-controller="PrivacyCtrl" class="content"><h1>Política de Privacidad de DineX</h1><hr/><p>Última revisión 02/10/2014</p><p>Esta Política de Privacidad describe como <strong>Dinex SpA.</strong> y sus subsidiarias y empresas afiliadas ("DineX", "nosotros" o "nos") recogen, utilizan y comparten su información.</p><br/><br/><h2>Alcances</h2><hr/><p>Esta política se aplica a la information que recopilamos cuando usted utiliza nuestros sitios y servicios web, incluyendo www.dinex.cl y las aplicaciones para Smartphones disponibles (colectivamente, el "Sitio", el "Servicio", la "Aplicación" o la "App") o de otra manera interactúa con nosotros como se describe a continuación. Esta política deriva de la</p><a href="https://ripple.com/privacy-policy"> política de privacidad del software de código abierto Ripple Client</a> y el código abierto de la red global de pagos distribuidos Ripple al que se accede mediante dicho software (colectivamente, "Ripple"), en los cuales se basa el código de nuestro sitio y aplicación. DineX no posee ni controla Ripple. Ripple no posee ni controla DineX. Sin embargo, si accede a Ripple de un enlace en nuestro sitio, podemos recoger la información indicada en la "Información que recopilamos automáticamente" descrita a continuación. Si lo prefiere, por lo general puede configurar su navegador para eliminar o rechazar las cookies, lo cual deshabilita cualquier información que recogemos de las cookies. Nosotros utilizamos la información recopilada exclusivamente para analizar tendencias y evaluar el compromiso del usuario con el servicio. No difundiremos ninguna información recopilada en nuestro sitio y/o proporcionada por el usuario. Además, si accede a Ripple por cualquier otro método, que no sea a través de un hipervínculo a disposición a través de nuestro sitio, entonces no recopilaremos ninguna información en relación con el uso de Ripple.<p>Podemos cambiar esta Política de Privacidad de vez en cuando. Si hacemos cambios, le notificaremos mediante la revisión de la fecha en la parte superior de esta política, y en algunos casos, podemos agregar una notificación adicional (por ejemplo, agregar una declaración a las páginas principales de nuestro Sitio o enviándole un correo electrónico de notificación). Le recomendamos que revise la política de privacidad cada vez que interactúa con nosotros para mantenerse informado de nuestras prácticas de información y las formas en que puede ayudar a proteger su privacidad.</p><p></p><br/><br/><h2>Recopilación de Información</h2><hr/><p>Recopilamos la infromación que usted nos proporciona directamente a nosotros. Por ejemplo, recopilamos información al crear una cuenta en línea, enviar mensajes a nuestros foros o wikis o si se comunica con nosotros. Los tipos de información que podemos recopilar incluyen su nombre, dirección de correo electrónico, nombre de usuario, contraseña, datos bancarios, ubicación y cualquier otra información que opte por ofrecer.</p><p>Nosotros recopilamos automáticamente cierta información sobre usted cuando acceda o utilice nuestro Sitio o realizar transacciones comerciales con nosotros, incluyendo: información sobre su uso de nuestro sitio, el tipo de navegador que utiliza, los tiempos de acceso, páginas visitadas, dirección IP y la página que visitó antes de navegar en nuestro Sitio. Igualmente podemos usar cookies, web beacons (también conocidos como "píxeles de seguimiento") y otras tecnologías de seguimiento para recopilar información acerca de usted cuando usted interactúa con nuestro Sitio o mensajes de correo electrónico, incluida la información sobre su patrón de navegación en nuestro Sitio. Utilizamos esta información para mejorar nuestro sitio y su experiencia, ver qué áreas son populares, entender la efectividad de campañas de comunicación y determinar si un correo electrónico se ha abierto y se ha hecho clic en los enlaces del correo electrónico.</p><p>También podemos obtener información sobre usted de otras fuentes y combinar eso con la información que recopilamos sobre usted, tales como servicios públicos y redes sociales.</p><br/><br/><h2>Uso de la información</h2><hr/><p>Podemos usar información sobre usted para diversos fines, entre ellos: Responder a sus comentarios, preguntas y peticiones y ofrecer un servicio al cliente; Supervisar y analizar tendencias, usos y actividades con el fin de operar y mejorar nuestro Sitio; Gestionar su cuenta en línea y enviarle notificaciones, actualizaciones, alertas de seguridad y mensajes de apoyo y administrativos; Enlazar o combinar con la información que recibimos de los demás para ayudar a entender sus necesidades y ofrecerle un mejor servicio; Llevar a cabo cualquier otra finalidad para la cual se obtuvo la información.</p><p>Nuestra base está en Chile y la información que recogemos se rige por la ley chilena. Al acceder o utilizar nuestro Sitio o de otra manera proporcionar información a nosotros, usted consiente el tratamiento y la transferencia de información en y para Chile y otros países.</p></section>');
	}
	return buf.join("");
	}

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	var formatRegExp = /%[sdj%]/g;
	exports.format = function(f) {
	  if (!isString(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }
	    return objects.join(' ');
	  }

	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function(x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s': return String(args[i++]);
	      case '%d': return Number(args[i++]);
	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }
	      default:
	        return x;
	    }
	  });
	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }
	  return str;
	};


	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	exports.deprecate = function(fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined(global.process)) {
	    return function() {
	      return exports.deprecate(fn, msg).apply(this, arguments);
	    };
	  }

	  if (process.noDeprecation === true) {
	    return fn;
	  }

	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (process.throwDeprecation) {
	        throw new Error(msg);
	      } else if (process.traceDeprecation) {
	        console.trace(msg);
	      } else {
	        console.error(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }

	  return deprecated;
	};


	var debugs = {};
	var debugEnviron;
	exports.debuglog = function(set) {
	  if (isUndefined(debugEnviron))
	    debugEnviron = process.env.NODE_DEBUG || '';
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
	      var pid = process.pid;
	      debugs[set] = function() {
	        var msg = exports.format.apply(exports, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function() {};
	    }
	  }
	  return debugs[set];
	};


	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    exports._extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}
	exports.inspect = inspect;


	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	  'bold' : [1, 22],
	  'italic' : [3, 23],
	  'underline' : [4, 24],
	  'inverse' : [7, 27],
	  'white' : [37, 39],
	  'grey' : [90, 39],
	  'black' : [30, 39],
	  'blue' : [34, 39],
	  'cyan' : [36, 39],
	  'green' : [32, 39],
	  'magenta' : [35, 39],
	  'red' : [31, 39],
	  'yellow' : [33, 39]
	};

	// Don't use 'blue' not visible on cmd.exe
	inspect.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};


	function stylizeWithColor(str, styleType) {
	  var style = inspect.styles[styleType];

	  if (style) {
	    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
	           '\u001b[' + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}


	function stylizeNoColor(str, styleType) {
	  return str;
	}


	function arrayToHash(array) {
	  var hash = {};

	  array.forEach(function(val, idx) {
	    hash[val] = true;
	  });

	  return hash;
	}


	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect &&
	      value &&
	      isFunction(value.inspect) &&
	      // Filter out the util module, it's inspect function is special
	      value.inspect !== exports.inspect &&
	      // Also filter out any prototype objects using the circular check.
	      !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }

	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }

	  // Look up the keys of the object.
	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);

	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  }

	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError(value)
	      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }

	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }

	  var base = '', array = false, braces = ['{', '}'];

	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }

	  // Make functions say that they are functions
	  if (isFunction(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }

	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }

	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }

	  // Make error with message first say the error
	  if (isError(value)) {
	    base = ' ' + formatError(value);
	  }

	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }

	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }

	  ctx.seen.push(value);

	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function(key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }

	  ctx.seen.pop();

	  return reduceToSingleString(output, base, braces);
	}


	function formatPrimitive(ctx, value) {
	  if (isUndefined(value))
	    return ctx.stylize('undefined', 'undefined');
	  if (isString(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
	                                             .replace(/'/g, "\\'")
	                                             .replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber(value))
	    return ctx.stylize('' + value, 'number');
	  if (isBoolean(value))
	    return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value))
	    return ctx.stylize('null', 'null');
	}


	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}


	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function(key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          key, true));
	    }
	  });
	  return output;
	}


	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }
	  if (!hasOwnProperty(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function(line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function(line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'")
	                 .replace(/\\"/g, '"')
	                 .replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }

	  return name + ': ' + str;
	}


	function reduceToSingleString(output, base, braces) {
	  var numLinesEst = 0;
	  var length = output.reduce(function(prev, cur) {
	    numLinesEst++;
	    if (cur.indexOf('\n') >= 0) numLinesEst++;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);

	  if (length > 60) {
	    return braces[0] +
	           (base === '' ? '' : base + '\n ') +
	           ' ' +
	           output.join(',\n  ') +
	           ' ' +
	           braces[1];
	  }

	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}


	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;

	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;

	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;

	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;

	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;

	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;

	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;

	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;

	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;

	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;

	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;

	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;

	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;

	exports.isBuffer = __webpack_require__(81);

	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}


	function pad(n) {
	  return n < 10 ? '0' + n.toString(10) : n.toString(10);
	}


	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
	              'Oct', 'Nov', 'Dec'];

	// 26 Feb 16:19:34
	function timestamp() {
	  var d = new Date();
	  var time = [pad(d.getHours()),
	              pad(d.getMinutes()),
	              pad(d.getSeconds())].join(':');
	  return [d.getDate(), months[d.getMonth()], time].join(' ');
	}


	// log is just a thin wrapper to console.log that prepends a timestamp
	exports.log = function() {
	  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
	};


	/**
	 * Inherit the prototype methods from one constructor into another.
	 *
	 * The Function.prototype.inherits from lang.js rewritten as a standalone
	 * function (not on Function.prototype). NOTE: If this file is to be loaded
	 * during bootstrapping this function needs to be rewritten using some native
	 * functions as prototype setup using normal JavaScript does not work as
	 * expected during bootstrapping (see mirror.js in r114903).
	 *
	 * @param {function} ctor Constructor function which needs to inherit the
	 *     prototype.
	 * @param {function} superCtor Constructor function to inherit prototype from.
	 */
	exports.inherits = __webpack_require__(83);

	exports._extend = function(origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject(add)) return origin;

	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	};

	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(82)))

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events)
	    this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      }
	      throw TypeError('Uncaught, unspecified "error" event.');
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler))
	    return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        len = arguments.length;
	        args = new Array(len - 1);
	        for (i = 1; i < len; i++)
	          args[i - 1] = arguments[i];
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    len = arguments.length;
	    args = new Array(len - 1);
	    for (i = 1; i < len; i++)
	      args[i - 1] = arguments[i];

	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events)
	    this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    var m;
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type])
	    return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);

	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0)
	      return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;

	  if (!this._events)
	    return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  var ret;
	  if (!emitter._events || !emitter._events[type])
	    ret = 0;
	  else if (isFunction(emitter._events[type]))
	    ret = 1;
	  else
	    ret = emitter._events[type].length;
	  return ret;
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(80);

	module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
	attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
	var buf = [];
	with (locals || {}) {
	var interp;
	buf.push('<nav role="navigation" ng-controller="NavbarCtrl" class="navbar"><div class="mainnav"><div class="container"><div class="navbar-header"><div class="navbar-toggle snapper-toggle"><a href="" class="fa fa-bars"></a></div><a id="logo" href="#/" title="DineX" class="navbar-brand hidden-xs"></a></div><div class="collapse navbar-collapse"><ul class="nav navbar-nav topMenu"><li id="nav-wallet" ng-class="{active: $route.current.mainMenu == \'wallet\'}"><a href="#/balance">Resumen</a></li><li id="nav-withdraw" ng-class="{active: $route.current.mainMenu == \'withdraw\'}"><a href="#/withdraw">Retirar</a></li></ul><ul class="nav navbar-nav navbar-right"><li class="dropdown balances-dropdown"><p ng-show="!loadState.account" class="navbar-text">Cargando su saldo...</p><a ng-show="loadState.account" class="dropdown-toggle"><span ng-show="!account.Account" class="balance primary">Cuenta sin fondos</span><span ng-show="account.Account" class="balance primary"></span><li ng-repeat="balance in balances" class="balance"><span class="balance">{{balance.total | rpamount:{rel_precision: 0} }}&nbsp;</span><span rp-currency="balance.total" rp-currency-short="rp-currency-short" class="balance"></span></li></a></li><li ng-hide="\'desktop\' === client"><a href="#/account">~{{userCredentials.username}}</a></li><li class="dropdown notifications-dropdown"><a ng-click="read()" class="dropdown-toggle fa fa-bell"><div ng-show="unseenNotifications.count" class="number">{{unseenNotifications.count}}</div></a><ul id="notifications" class="dropdown-menu"><li ng-hide="loadState.transactions" class="message">Cargando...</li><li ng-show="loadState.transactions &amp;&amp; !notifications.length" class="message">No hay notificaciones recientes.</li><li ng-repeat="entry in notifications" ng-class="{unseen: entry.unseen}" rp-link-tx="entry.hash" ng-show="notifications.length" class="notification"><div ng-switch on="entry.transaction.type" class="desc"><div ng-switch-when="sent" class="transaction"><span>Ha enviado <strong class="nowrap"> {{entry.transaction.amount | rpamount}} {{entry.transaction.amount | rpcurrency}}</strong> a <span title="{{entry.transaction.counterparty}}" class="address"> {{entry.transaction.counterparty | rpcontactname}}</span></span>');
	var __val__ = __webpack_require__(79)()
	buf.push(null == __val__ ? "" : __val__);
	buf.push('</div><div ng-switch-when="received" class="transaction"><span title="{{entry.transaction.counterparty}}" class="address"><span>{{entry.transaction.counterparty | rpcontactnamefull | rpripplename: {tilde: true} }}</span> te envio<strong class="nowrap"> {{entry.transaction.amount | rpamount:{reference_date:entry.dateRaw} }} {{entry.transaction.amount | rpcurrency}}</strong></span>');
	var __val__ = __webpack_require__(79)()
	buf.push(null == __val__ ? "" : __val__);
	buf.push('</div><div ng-switch-when="exchange" class="transaction"><span>You requested to exchange<strong class="nowrap"> {{entry.transaction.spent | rpamount}}\n{{entry.transaction.spent | rpcurrency}}</strong> to<strong class="nowrap"> {{entry.transaction.amount | rpamount}}\n{{entry.transaction.amount | rpcurrency}}</strong></span>');
	var __val__ = __webpack_require__(79)()
	buf.push(null == __val__ ? "" : __val__);
	buf.push('</div><div ng-switch-when="trusted" class="transaction"><span title="{{entry.transaction.counterparty}}" class="address">{{entry.transaction.counterparty | rpcontactname}} now trusts you for</span><strong class="nowrap"> {{entry.transaction.amount | rpamount}}\n{{entry.transaction.amount | rpcurrency}}</strong>');
	var __val__ = __webpack_require__(79)()
	buf.push(null == __val__ ? "" : __val__);
	buf.push('</div><div ng-switch-when="trusting" class="transaction"><span>You now trust&#32;<span title="{{entry.transaction.counterparty}}" class="address">{{entry.transaction.counterparty | rpcontactname}}</span> for<strong class="nowrap"> {{entry.transaction.amount | rpamount:{reference_date:entry.dateRaw} }}\n{{entry.transaction.amount | rpcurrency}}</strong>.</span>');
	var __val__ = __webpack_require__(79)()
	buf.push(null == __val__ ? "" : __val__);
	buf.push('</div><div ng-switch-when="offernew" class="transaction"><span ng-show="entry.transaction.sell">You created an order to sell&#32;<strong>{{entry.transaction.gets | rpamount}} {{entry.transaction.gets | rpcurrency}}</strong> for&#32;<strong>{{entry.transaction.pays | rpamount}} {{entry.transaction.pays | rpcurrency}}</strong></span><span ng-hide="entry.transaction.sell">You created an order to buy&#32;<strong>{{entry.transaction.pays | rpamount}} {{entry.transaction.pays | rpcurrency}}</strong> for&#32;<strong>{{entry.transaction.gets | rpamount}} {{entry.transaction.gets | rpcurrency}}</strong></span>');
	var __val__ = __webpack_require__(79)()
	buf.push(null == __val__ ? "" : __val__);
	buf.push('</div><div ng-switch-when="offercancel" class="transaction"><span>You cancelled an order accepting&#32;<strong class="nowrap">{{entry.transaction.pays | rpamount}}\n{{entry.transaction.pays | rpcurrency}}</strong> for&#32;<strong class="nowrap">{{entry.transaction.gets | rpamount}}\n{{entry.transaction.gets | rpcurrency}}</strong></span>');
	var __val__ = __webpack_require__(79)()
	buf.push(null == __val__ ? "" : __val__);
	buf.push('</div><div ng-switch-when="accountset" class="transaction">Los datos de la cuenta han sido modificados</div><div ng-switch-when="rippling" class="transaction"><span>Calculando</span>');
	var __val__ = __webpack_require__(79)()
	buf.push(null == __val__ ? "" : __val__);
	buf.push('</div><div ng-switch-when="failed" class="transaction">Transacción fallida</div><div ng-switch-default="ng-switch-default" class="transaction">');
	var __val__ = __webpack_require__(79)()
	buf.push(null == __val__ ? "" : __val__);
	buf.push('</div></div><div class="date">{{entry.date | rpfromnow}}</div></li><li ng-show="notifications.length" class="history"><a href="#/history">Ver historial completo</a></li></ul></li><li class="settings"><a class="dropdown-toggle fa fa-cog"></a><ul class="dropdown-menu"><li><a href="#/account"><img src="img/profile.png"/> Cuenta</a></li><!--li.divider--><!--li: a(href="#/trust", l10n) Trust--><li class="divider"></li><li><a href="#/security"><img src="img/settings.png"/> Preferencias</a></li><li class="divider"></li><li><a ng-click="logout()" class="logout"><img src="img/logout.png"/> Salir</a></li></ul></li></ul></div></div></div><div ng-show="$route.current.mainMenu == \'wallet\'" class="subnav"><div class="container"><ul><li ng-class="{active: $route.current.tabName == \'balance\'}"><a href="#/balance">Balance</a></li><li ng-class="{active: $route.current.tabName == \'history\'}"><a href="#/history">Historial</a></li></ul></div></div><div ng-show="$route.current.mainMenu == \'exchange\' || $route.current.mainMenu == \'trade\'" class="subnav"><div class="container"><ul><li ng-class="{active: $route.current.tabName == \'trade\'}"><a href="#/trade">Trade</a></li><li ng-class="{active: $route.current.tabName == \'exchange\'}"><a href="#/exchange">Convert</a></li></ul></div></div><div ng-if="recovered" ng-show="recovered" class="auth-attention banner text-center"><h4>Su cuenta ha sido recuperada y la nueva contraseña se ha guardado con éxito!</h4><a href="#" ng-click="recovered = false">descartar</a></div></nav>');
	}
	return buf.join("");
	}

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(80);

	module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
	attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
	var buf = [];
	with (locals || {}) {
	var interp;
	buf.push('<ul ng-show="entry.effects" class="effects"><li ng-repeat="effect in entry.showEffects" ng-switch on="effect.type"><span ng-switch-when="offer_funded"><span ng-show="effect.sell" rp-span-spacing="rp-span-spacing">Sin información</span><span ng-hide="effect.sell" rp-span-spacing="rp-span-spacing">Sin información</span>(<span>precio</span><span>:<strong> {{effect.price | rpamount:{precision: 4} }}</strong></span>).<span>Esta orden se ha completado.</span></span><span ng-switch-when="offer_partially_funded"><span ng-show="effect.sell" rp-span-spacing="rp-span-spacing">Sin información</span><span ng-hide="effect.sell" rp-span-spacing="rp-span-spacing">Sin información</span>(<span>precio</span><span>:<strong> {{effect.price | rpamount:{precision: 4} }}</strong></span>).<span ng-show="effect.cancelled">El resto de su orden se ha cancelado debido a falta de fondos</span><span ng-hide="effect.deleted" rp-span-spacing="rp-span-spacing">sin informacion.</span></span><span ng-switch-when="offer_cancelled">sin informacion</span><span ng-switch-when="offer_created"><span ng-show="effect.sell" rp-span-spacing="rp-span-spacing">No se puede realizar la operación.</span><span ng-hide="effect.sell" rp-span-spacing="rp-span-spacing">No se puede realizar la operación.</span></span><span ng-switch-when="offer_bought" rp-span-spacing="rp-span-spacing">sin informacion</span><span ng-switch-when="trust_create_local">Activado</span><span ng-switch-when="trust_create_remote" rp-span-spacing="rp-span-spacing"><span rp-pretty-identity="effect.counterparty"></span>is trusting you for<span rp-pretty-amount="effect.limit"></span>.</span><span ng-switch-when="trust_change_local" rp-span-spacing="rp-span-spacing">sin informacion</span><span ng-switch-when="trust_change_remote" rp-span-spacing="rp-span-spacing"><span rp-pretty-identity="effect.counterparty"></span>changed the<span>{{effect.limit | rpcurrency}}</span>trust from<span>{{effect.prevLimit | rpamount:{reference_date: entry.dateRaw} }}</span>to<span>{{effect.limit | rpamount:{reference_date: entry.dateRaw} }}</span>.</span><span ng-switch-when="trust_change_balance" rp-span-spacing="rp-span-spacing">sin informacion</span><span ng-switch-when="balance_change" rp-span-spacing="rp-span-spacing">sin informacion</span></li></ul>');
	}
	return buf.join("");
	}

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	
	/*!
	 * Jade - runtime
	 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
	 * MIT Licensed
	 */

	/**
	 * Lame Array.isArray() polyfill for now.
	 */

	if (!Array.isArray) {
	  Array.isArray = function(arr){
	    return '[object Array]' == Object.prototype.toString.call(arr);
	  };
	}

	/**
	 * Lame Object.keys() polyfill for now.
	 */

	if (!Object.keys) {
	  Object.keys = function(obj){
	    var arr = [];
	    for (var key in obj) {
	      if (obj.hasOwnProperty(key)) {
	        arr.push(key);
	      }
	    }
	    return arr;
	  }
	}

	/**
	 * Merge two attribute objects giving precedence
	 * to values in object `b`. Classes are special-cased
	 * allowing for arrays and merging/joining appropriately
	 * resulting in a string.
	 *
	 * @param {Object} a
	 * @param {Object} b
	 * @return {Object} a
	 * @api private
	 */

	exports.merge = function merge(a, b) {
	  var ac = a['class'];
	  var bc = b['class'];

	  if (ac || bc) {
	    ac = ac || [];
	    bc = bc || [];
	    if (!Array.isArray(ac)) ac = [ac];
	    if (!Array.isArray(bc)) bc = [bc];
	    ac = ac.filter(nulls);
	    bc = bc.filter(nulls);
	    a['class'] = ac.concat(bc).join(' ');
	  }

	  for (var key in b) {
	    if (key != 'class') {
	      a[key] = b[key];
	    }
	  }

	  return a;
	};

	/**
	 * Filter null `val`s.
	 *
	 * @param {Mixed} val
	 * @return {Mixed}
	 * @api private
	 */

	function nulls(val) {
	  return val != null;
	}

	/**
	 * Render the given attributes object.
	 *
	 * @param {Object} obj
	 * @param {Object} escaped
	 * @return {String}
	 * @api private
	 */

	exports.attrs = function attrs(obj, escaped){
	  var buf = []
	    , terse = obj.terse;

	  delete obj.terse;
	  var keys = Object.keys(obj)
	    , len = keys.length;

	  if (len) {
	    buf.push('');
	    for (var i = 0; i < len; ++i) {
	      var key = keys[i]
	        , val = obj[key];

	      if ('boolean' == typeof val || null == val) {
	        if (val) {
	          terse
	            ? buf.push(key)
	            : buf.push(key + '="' + key + '"');
	        }
	      } else if (0 == key.indexOf('data') && 'string' != typeof val) {
	        buf.push(key + "='" + JSON.stringify(val) + "'");
	      } else if ('class' == key && Array.isArray(val)) {
	        buf.push(key + '="' + exports.escape(val.join(' ')) + '"');
	      } else if (escaped && escaped[key]) {
	        buf.push(key + '="' + exports.escape(val) + '"');
	      } else {
	        buf.push(key + '="' + val + '"');
	      }
	    }
	  }

	  return buf.join(' ');
	};

	/**
	 * Escape the given string of `html`.
	 *
	 * @param {String} html
	 * @return {String}
	 * @api private
	 */

	exports.escape = function escape(html){
	  return String(html)
	    .replace(/&(?!(\w+|\#\d+);)/g, '&amp;')
	    .replace(/</g, '&lt;')
	    .replace(/>/g, '&gt;')
	    .replace(/"/g, '&quot;');
	};

	/**
	 * Re-throw the given `err` in context to the
	 * the jade in `filename` at the given `lineno`.
	 *
	 * @param {Error} err
	 * @param {String} filename
	 * @param {String} lineno
	 * @api private
	 */

	exports.rethrow = function rethrow(err, filename, lineno){
	  if (!filename) throw err;

	  var context = 3
	    , str = __webpack_require__(84).readFileSync(filename, 'utf8')
	    , lines = str.split('\n')
	    , start = Math.max(lineno - context, 0)
	    , end = Math.min(lines.length, lineno + context);

	  // Error context
	  var context = lines.slice(start, end).map(function(line, i){
	    var curr = i + start + 1;
	    return (curr == lineno ? '  > ' : '    ')
	      + curr
	      + '| '
	      + line;
	  }).join('\n');

	  // Alter exception message
	  err.path = filename;
	  err.message = (filename || 'Jade') + ':' + lineno
	    + '\n' + context + '\n\n' + err.message;
	  throw err;
	};


/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function isBuffer(arg) {
	  return arg && typeof arg === 'object'
	    && typeof arg.copy === 'function'
	    && typeof arg.fill === 'function'
	    && typeof arg.readUInt8 === 'function';
	}

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	// shim for using process in browser

	var process = module.exports = {};

	process.nextTick = (function () {
	    var canSetImmediate = typeof window !== 'undefined'
	    && window.setImmediate;
	    var canPost = typeof window !== 'undefined'
	    && window.postMessage && window.addEventListener
	    ;

	    if (canSetImmediate) {
	        return function (f) { return window.setImmediate(f) };
	    }

	    if (canPost) {
	        var queue = [];
	        window.addEventListener('message', function (ev) {
	            var source = ev.source;
	            if ((source === window || source === null) && ev.data === 'process-tick') {
	                ev.stopPropagation();
	                if (queue.length > 0) {
	                    var fn = queue.shift();
	                    fn();
	                }
	            }
	        }, true);

	        return function nextTick(fn) {
	            queue.push(fn);
	            window.postMessage('process-tick', '*');
	        };
	    }

	    return function nextTick(fn) {
	        setTimeout(fn, 0);
	    };
	})();

	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	}

	// TODO(shtylman)
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var files = {};
	exports.setFile = function(filename, content) { files[filename] = content; }
	exports.readFileSync = function(filename) { return files[filename] || ""; }

/***/ }
/******/ ])