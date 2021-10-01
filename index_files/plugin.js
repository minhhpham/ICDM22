( function( $ ) {

	$( document ).ready( function() {
		var currentListItem;
		var topMenu = $( '#top-menu' );
		var diviHoverClasses = 'et-hover et-show-dropdown';
		var lastKey = new Date();
		var lastClick = new Date();

		$( this ).keyup( function( e ) {
			update_top_menu_classes();
			$( '.et-search-field' ).focus( function() {
				show_search();
			}).blur( function() {
				hide_search();
			});
		});

		/**
		 * Add skiplink to page
		 */
		function skipTo( target ) {
			var skiplink = '<a href="' + target + '" class="skip-link dtn-screen-reader-text">Skip to content</a>';
			$( target ).attr( 'tabindex', -1 );
			$( 'body' ).prepend( skiplink );
		}

		skipTo( '#main-content' );

		/**
		 * Use js to focus for internal links
		 */
		$( 'a[href^="#"]' ).click( function() {
			var content = $( '#' + $(this).attr( 'href' ).slice(1) );
			content.focus();
		});

		/**
		 * Only apply focus styles for keyboard usage.
		 */
		$( this ).on( 'focusin', function( e ) {
			$( '.keyboard-outline' ).removeClass( 'keyboard-outline' );
			var wasByKeyboard = lastClick < lastKey
			if( wasByKeyboard ) {
				$( e.target ).addClass( 'keyboard-outline' );
			}
		});
		$( this ).on( 'mousedown', function() {
			lastClick = new Date();
		});
		$( this ).on( 'keydown', function() {
			lastKey = new Date();
		});

		/**
		 * Allow 'Accordian' & 'Toggle' Divi modules to be focusable.
		 */
		$( '.et_pb_toggle' ).each( function() {
			$( this ).attr( 'tabindex', 0 );
		});

		/**
		 * Expand 'Accordian' & 'Toggle' Divi modules when enter is hit while focused.
		 */
		$( document ).keypress( function( e ) {
			if ( e.which == 13 ) {
				$( '.et_pb_toggle:focus .et_pb_toggle_title' ).trigger( 'click' );
			}
		});

		/**
		 * Update top navigation classes.
		 */
		function update_top_menu_classes() {
		var currentLink = topMenu.find( 'a:focus' );
			currentListItem = currentLink.closest( 'li' );

			// check if focused on top level nav item
			if ( topMenu.is( currentListItem.closest( 'ul' ) ) || topMenu.find( 'a:focus' ).length == 0 ) {
				topMenu.find( 'li' ).removeClass( diviHoverClasses )
			}

			// add appropriate divi hover classes if nav item has children
			if ( $( currentListItem ).children( 'ul' ).length ) {
				currentListItem.addClass( diviHoverClasses );
			}
		}

		/**
		 * Show the search.
		 *
		 * @since Divi v3.0.23
		 */
		function show_search() {
			var $search_container = $( '.et_search_form_container' );

			if ( $search_container.hasClass( 'et_pb_is_animating' ) ) {
				return;
			}

			$( '.et_menu_container' ).removeClass( 'et_pb_menu_visible et_pb_no_animation' ).addClass( 'et_pb_menu_hidden' );
			$search_container.removeClass( 'et_pb_search_form_hidden et_pb_no_animation' ).addClass( 'et_pb_search_visible et_pb_is_animating' );
			setTimeout( function() {
				$( '.et_menu_container' ).addClass( 'et_pb_no_animation' );
				$search_container.addClass( 'et_pb_no_animation' ).removeClass( 'et_pb_is_animating' );
			}, 1000);
			$search_container.find( 'input' ).focus();

			et_set_search_form_css();
		}

		/**
		 * Hide the search.
		 *
		 * @since Divi v3.0.23
		 */
		function hide_search() {
			if ( $( '.et_search_form_container' ).hasClass( 'et_pb_is_animating' ) ) {
				return;
			}

			$( '.et_menu_container' ).removeClass( 'et_pb_menu_hidden et_pb_no_animation' ).addClass( 'et_pb_menu_visible' );
			$( '.et_search_form_container' ).removeClass('et_pb_search_visible et_pb_no_animation' ).addClass( 'et_pb_search_form_hidden et_pb_is_animating' );
			setTimeout( function() {
				$( '.et_menu_container' ).addClass( 'et_pb_no_animation' );
				$( '.et_search_form_container' ).addClass( 'et_pb_no_animation' ).removeClass( 'et_pb_is_animating' );
			}, 1000);
		}

		/**
		 * Generate search form styles.
		 *
		 * @since Divi v3.0.23
		 */
		function et_set_search_form_css() {
			var $search_container = $( '.et_search_form_container' );
			var $body = $( 'body' );
			if ( $search_container.hasClass( 'et_pb_search_visible' ) ) {
				var header_height = $( '#main-header' ).innerHeight(),
					menu_width = $( '#top-menu' ).width(),
					font_size = $( '#top-menu li a' ).css( 'font-size' );
				$search_container.css( { 'height' : header_height + 'px' } );
				$search_container.find( 'input' ).css( 'font-size', font_size );
				if ( ! $body.hasClass( 'et_header_style_left' ) ) {
					$search_container.css( 'max-width', menu_width + 60 );
				} else {
					$search_container.find( 'form' ).css( 'max-width', menu_width + 60 );
				}
			}
		}

	});

})( jQuery );
