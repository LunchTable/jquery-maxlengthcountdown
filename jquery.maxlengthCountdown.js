/**
 *   jQuery maxlength-countdown
 *   Adds a "remaining characters" counter after any field with maxlength field.
 *
 *   Copyright 2013 Matt Baer
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
(function($) {
    $.fn.maxlengthCountdown = function(options) {
        var defaults = {
            countClass: 'count-me-down',
            suffixText: '',
            suffixTextSingular: '',
            before: true,
            visible: true,
            alwaysOn: true,
            showThres: 0,
        };
        
        options = $.extend(defaults, options);
        
        // Handle case of only singular form is needed
        if (options.suffixText !== '' && options.suffixTextSingular === '') {
            options.suffixTextSingular = options.suffixText;
        }

        return this.filter('input').not('[type=checkbox], [type=radio]').each(function() {

            var $input = $(this),
                $counter;
            var maxlength = $input.attr('maxlength');
            
            var addCounter = function() {
                var counter;
                if (options.showThres > 0) {
                    counterDiv = '<div style="display:none;" />';
                } else {
                    counterDiv = '<div />';
                }
                // Create counter in given position
                if (options.before) {
                    $input.before(counterDiv);
                    $counter = $input.prev('div');
                } else {
                    $input.after(counterDiv);
                    $counter = $input.next('div');
                }
                
                // Populate counter
                $counter.addClass(options.countClass).text(maxlength + ' ' + options.suffixText);
            };
            
            var hideCounter = function() {
                $input.off('blur.mlcd');
                // Remove counter
                $counter.hide();
                
                $input.on('focus.mlcd', showCounter);
            };
            var showCounter = function() {
                $input.off('focus.mlcd');
                // Show previously added counter
                if (options.showThres === 0 || (maxlength - $input.val().length) <= options.showThres) {
                    $counter.show();
                }
                
                $input.on('blur.mlcd', hideCounter);
            };
            
            var countMe = function() {
                var left = maxlength - $input.val().length;
                $counter.text( left + ' ' + (left === 1 ? options.suffixTextSingular : options.suffixText) );
                
                // Show/hide counter if we have a show threshold set
                if (options.showThres > 0) {
                    if (left <= options.showThres) {
                        $counter.show();
                    } else if (!options.alwaysOn) {
                        $counter.hide();
                    }
                }
            };

            // Only need a counter if input has maxlength
            if (maxlength !== undefined && maxlength > 0) {
                if (options.visible) {
                    // Counter is visible from the start, so add the counter now
                    addCounter();
                    $input.on('keyup.mlcd blur.mlcd', countMe);
                } else {
                    // Counter will hide until input is focused
                    // ...but first, check if we want the counter to stay visible
                    if (options.alwaysOn) {
                        $input.on('focus.mlcd', function() {
                            $(this).off('focus.mlcd');
                            // Add counter, bind changing event
                            addCounter();
                            $input.on('keyup.mlcd blur.mlcd', countMe);
                        });
                    } else {
                        $input.on('focus.mlcd', function() {
                            $(this).off('focus.mlcd');
                            // Add counter, bind changing event
                            addCounter();
                            $input.on('keyup.mlcd blur.mlcd', countMe);
                        });
                        $input.on('blur.mlcd', hideCounter);
                    }
                }
            }
        });
    };

})(jQuery);
