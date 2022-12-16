using Microsoft.Extensions.DependencyInjection;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Cms.Api.Management.Factories;
using Umbraco.New.Cms.Core.Factories;

namespace Umbraco.Cms.Api.Management.DependencyInjection;

public static class FactoryBuilderExtensions
{
    internal static IUmbracoBuilder AddFactories(this IUmbracoBuilder builder)
    {
        builder.Services.AddTransient<IDictionaryFactory, DictionaryFactory>();
        builder.Services.AddTransient<IModelsBuilderViewModelFactory, ModelsBuilderViewModelFactory>();
        builder.Services.AddTransient<IPackageDefinitionFactory, PackageDefinitionFactory>();
        builder.Services.AddTransient<IRelationViewModelFactory, RelationViewModelFactory>();

        return builder;
    }
}
