/**
 * Playlistr 
 *
 * A Soundcloud playlisting application
 *
 * @package Playlistr
 * @author Matt Richards
 * @copyright Copyright (c) 2012, Matt Richards
 * @licence http://opensource.org/licenses/MIT
 * @link http://lucidmoon.co.uk
 */
define([
  // Libraries
  'lodash',
  'backbone',
  'marionette',
  // Event Aggregator
  'vent',
  // Models
  'models/playlist-model',
  // Views
  'views/alert-view',
  'views/playlist-detail-view',
  // Templates
  'text!templates/playlist-list-item.html'
],
/**
 * Playlist List Item View
 * @name    PlaylistListItemView
 * @class   PlaylistListItemView
 * @constructor
 * @return {Object} Marionette.ItemView
 */
function(_, Backbone, Marionette, vent, AlertView, Playlist, PlaylistDetailView, tpl){
  'use strict';
  return Marionette.ItemView.extend({
    /**
     * Tag name
     * @type {String}
     * @memberOf PlaylistListItemView
     */
    tagName: 'li',

    /**
     * Template
     * @type {Mixed}
     * @memberOf PlaylistListItemView
     */    
    template: _.template(tpl),

    /**
     * DOM event listeners
     * @type {Mixed}
     * @memberOf PlaylistListItemView
     */
    events: {
      'click': 'click',
      'click li .delete': 'deletePlaylist'
    },
  
    /**
     * Constructor
     * @memberOf PlaylistListItemView
     */
    initialize: function() {
      this.model.on('change', this.render, this);
    },

    /**
     * Click event handler, trigger playlist:show application event
     * @memberOf PlaylistListItemView
     */
    click: function() {
      Backbone.history.navigate('playlist/' + this.model.id, true);
    },

    /**
     * Delete click event handler, delete playlist.
     * @memberOf PlaylistListItemView
     * @todo handle model.destroy() error
     */
    deletePlaylist: function() {
      var title = this.model.get('title'); 
      // Confirm delete
      if (confirm('Are you sure you want to delete \'' + title + '\'?\n\nThis action can not be un-done.')) {
        // Destroy Model
        this.model.destroy({
          success: function() {
            // Trigger app:region:close:main application event
            vent.trigger('app:region:close:main');
            var alert = new AlertView({'message': '\'<strong>' + title + '</strong>\' deleted succesfully','type':'success'});
          },
          error: function() {

          }
        });  
      } 
    }
  });  
});
