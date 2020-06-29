angular.module("umbraco")
.controller("Umbraco.Editors.BlockEditorController",
    function ($scope, localizationService, formHelper) {
        var vm = this;

        vm.model = $scope.model;

        localizationService.localizeMany([
            $scope.model.liveEditing ? "prompt_discardChanges" : "general_close",
            $scope.model.liveEditing ? "buttons_confirmActionConfirm" : "buttons_submitChanges"
        ]).then(function (data) {
            vm.closeLabel = data[0];
            vm.submitLabel = data[1];
        });


        vm.tabs = [];

        if ($scope.model.content && $scope.model.content.variants) {

            var apps = $scope.model.content.apps;

            vm.tabs = apps;

            // replace view of content app.
            var contentApp = apps.find(entry => entry.alias === "umbContent");
            if(contentApp) {
                contentApp.view = "views/common/infiniteeditors/blockeditor/blockeditor.content.html";
                if($scope.model.hideContent) {
                    apps.splice(apps.indexOf(contentApp), 1);
                } else if ($scope.model.openSettings !== true) {
                    contentApp.active = true;
                }
            }

            // remove info app:
            var infoAppIndex = apps.findIndex(entry => entry.alias === "umbInfo");
            apps.splice(infoAppIndex, 1);

        }

        if ($scope.model.settings && $scope.model.settings.variants) {
            localizationService.localize("blockEditor_tabBlockSettings").then(
                function (settingsName) {
                    var settingsTab = {
                        "name": settingsName,
                        "alias": "settings",
                        "icon": "icon-settings",
                        "view": "views/common/infiniteeditors/blockeditor/blockeditor.settings.html"
                    };
                    vm.tabs.push(settingsTab);
                    if ($scope.model.openSettings) {
                        settingsTab.active = true;
                    }
                }
            );
        }

        vm.submitAndClose = function () {
            if ($scope.model && $scope.model.submit) {
                if (formHelper.submitForm({ scope: $scope })) {
                    $scope.model.submit($scope.model);
                }
            }
        }

        vm.close = function() {
            if ($scope.model && $scope.model.close) {
                // TODO: check if content/settings has changed and ask user if they are sure.
                $scope.model.close($scope.model);
            }
        }

    }
);