/**
 * select2��װ
 * @param {scope} ng-model ѡ�е�ID
 * @param {scope} select2-model ѡ�е���ϸ����
 * @param {scope} config �Զ�������
 * @param {String} [query] ���õ����� (��ôҲ����Ĭ��һ��config)
 * @example
 * <input select2 ng-model="a" select2-model="b" config="config" type="text" placeholder="ռλ��" />
 * <input select2 ng-model="a" select2-model="b" config="default" query="member" type="text" placeholder="ռλ��" />
 * <select select2 ng-model="b" class="form-control"></select>
 */
angular.module('select2', []).directive('select2', function (select2Query) {
    return {
        restrict: 'A',
        scope: {
            config: '=',
            ngModel: '=',
            select2Model: '='
        },
        link: function (scope, element, attrs) {
            // ��ʼ��
            var tagName = element[0].tagName,
                config = {
                    allowClear: true,
                    multiple: !!attrs.multiple,
                    placeholder: attrs.placeholder || ' '   // �޸�������ɾ����ť�����
                };

            // ����select
            if(tagName === 'SELECT') {
                // ��ʼ��
                var $element = $(element);
                delete config.multiple;

                $element
                    .prepend('<option value=""></option>')
                    .val('')
                    .select2(config);

                // model - view
                scope.$watch('ngModel', function (newVal) {
                    setTimeout(function () {
                        $element.find('[value^="?"]').remove();    // ������������
                        $element.select2('val', newVal);
                    },0);
                }, true);
                return false;
            }

            // ����input
            if(tagName === 'INPUT') {
                // ��ʼ��
                var $element = $(element);

                // ��ȡ��������
                if(attrs.query) {
                    scope.config = select2Query[attrs.query]();
                }

                // ��̬����select2
                scope.$watch('config', function () {
                    angular.extend(config, scope.config);
                    $element.select2('destroy').select2(config);
                }, true);

                // view - model
                $element.on('change', function () {
                    scope.$apply(function () {
                        scope.select2Model = $element.select2('data');
                    });
                });

                // model - view
                scope.$watch('select2Model', function (newVal) {
                    $element.select2('data', newVal);
                }, true);

                // model - view
                scope.$watch('ngModel', function (newVal) {
                    // ����ajax��ʽ�Լ���ѡ���
                    if(config.ajax || config.multiple) { return false }

                    $element.select2('val', newVal);
                }, true);
            }
        }
    }
});