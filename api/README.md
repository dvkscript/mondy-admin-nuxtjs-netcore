# Phân tích dự án CleanArc API
Dự án này là một ứng dụng .NET sử dụng kiến trúc Clean Architecture với các layer rõ ràng. Sau khi phân tích cấu trúc và mã nguồn, tôi có thể cung cấp tổng quan về dự án như sau:

## Cấu trúc dự án
Dự án được tổ chức thành các layer chính:

1. Core Layer :
   
   - CleanArc.Domain : Chứa các entity và business rules cốt lõi như User, Order
   - CleanArc.Application : Chứa business logic, interfaces, và các use cases (CQRS pattern với Mediator)
2. Infrastructure Layer :
   
   - CleanArc.Infrastructure.Persistence : Xử lý truy cập dữ liệu, Entity Framework, repositories
   - CleanArc.Infrastructure.Identity : Quản lý xác thực, phân quyền, JWT
   - CleanArc.Infrastructure.CrossCutting : Các dịch vụ cross-cutting như logging
   - CleanArc.Infrastructure.Monitoring : Giám sát ứng dụng
3. API Layer :
   
   - CleanArc.Web.Api : Ứng dụng web API chính
   - CleanArc.WebFramework : Framework chung cho web API
   - Plugins : Các plugin như gRPC
4. Shared Layer :
   
   - CleanArc.SharedKernel : Các thành phần dùng chung

## Cấu trúc thư mục chi tiết

### 1. Core Layer

#### 1.1. CleanArc.Domain
Thư mục cốt lõi chứa các entity và business rules:

```
CleanArc.Domain/
├── Common/                 # Các lớp cơ sở và tiện ích chung
│   └── BaseEntity.cs       # Lớp cơ sở cho tất cả các entity
└── Entities/               # Các entity của ứng dụng
    ├── Order/              # Entity Order và các lớp liên quan
    │   └── Order.cs        # Entity Order
    └── User/               # Entity User và các lớp liên quan
        ├── Role.cs         # Entity Role
        ├── RoleClaim.cs    # Entity RoleClaim
        ├── User.cs         # Entity User
        ├── UserClaim.cs    # Entity UserClaim
        ├── UserLogin.cs    # Entity UserLogin
        ├── UserRefreshToken.cs # Entity UserRefreshToken
        ├── UserRole.cs     # Entity UserRole
        └── UserToken.cs    # Entity UserToken
```

**Lưu ý**: Layer này không phụ thuộc vào bất kỳ layer nào khác và chỉ chứa các entity và business rules cốt lõi.

#### 1.2. CleanArc.Application
Thư mục chứa business logic và use cases:

```
CleanArc.Application/
├── Common/                 # Các behavior và tiện ích chung
│   ├── LoggingBehavior.cs  # Behavior ghi log
│   ├── MetricsBehaviour.cs # Behavior đo lường hiệu suất
│   └── ValidateCommandBehavior.cs # Behavior xác thực command
├── Contracts/              # Các interface
│   ├── IJwtService.cs      # Interface cho JWT service
│   ├── Identity/           # Interface cho Identity
│   │   ├── IAppUserManager.cs # Interface quản lý người dùng
│   │   └── IRoleManagerService.cs # Interface quản lý vai trò
│   └── Persistence/        # Interface cho Persistence
│       ├── IOrderRepository.cs # Interface repository Order
│       ├── IUnitOfWork.cs  # Interface Unit of Work
│       └── IUserRefreshTokenRepository.cs # Interface repository RefreshToken
├── Features/               # Các tính năng (CQRS pattern)
│   ├── Admin/              # Tính năng quản lý admin
│   │   ├── Commands/       # Các command
│   │   └── Queries/        # Các query
│   ├── Order/              # Tính năng quản lý đơn hàng
│   │   ├── Commands/       # Các command
│   │   └── Queries/        # Các query
│   ├── Role/               # Tính năng quản lý vai trò
│   │   ├── Commands/       # Các command
│   │   └── Queries/        # Các query
│   └── Users/              # Tính năng quản lý người dùng
│       ├── Commands/       # Các command
│       └── Queries/        # Các query
├── Models/                 # Các model
│   ├── ApiResult/          # Model kết quả API
│   │   ├── ApiResult.cs    # Model kết quả API
│   │   └── ApiResultStatusCodecs.cs # Mã trạng thái API
│   ├── Common/             # Model chung
│   │   └── OperationResult.cs # Kết quả thao tác
│   ├── Identity/           # Model Identity
│   │   ├── ActionDescriptionDto.cs # DTO mô tả hành động
│   │   ├── CreateRoleDto.cs # DTO tạo vai trò
│   │   ├── EditRolePermissionsDto.cs # DTO chỉnh sửa quyền vai trò
│   │   ├── GetRolesDto.cs  # DTO lấy vai trò
│   │   └── RolePermissionDto.cs # DTO quyền vai trò
│   └── Jwt/                # Model JWT
│       ├── AccessToken.cs  # Model access token
│       └── TokenRequest.cs # Model yêu cầu token
├── Profiles/               # Cấu hình AutoMapper
│   ├── ICreateMapper.cs    # Interface tạo mapper
│   └── RegisterMapper.cs   # Đăng ký mapper
└── ServiceConfiguration/   # Cấu hình dịch vụ
    └── ServiceCollectionExtension.cs # Mở rộng ServiceCollection
```

**Lưu ý**: Layer này phụ thuộc vào Domain layer và định nghĩa các interface mà Infrastructure layer sẽ triển khai.

### 2. Infrastructure Layer

#### 2.1. CleanArc.Infrastructure.Persistence
Thư mục xử lý truy cập dữ liệu:

```
CleanArc.Infrastructure.Persistence/
├── ApplicationDbContext.cs # DbContext của ứng dụng
├── Configuration/          # Cấu hình Entity Framework
│   ├── OrderConfig/        # Cấu hình Order
│   │   └── OrderConfig.cs  # Cấu hình Order
│   └── UserConfig/         # Cấu hình User
│       ├── RefreshTokenConfig.cs # Cấu hình RefreshToken
│       ├── RoleClaimConfig.cs # Cấu hình RoleClaim
│       ├── RoleConfig.cs   # Cấu hình Role
│       ├── UserClaimConfig.cs # Cấu hình UserClaim
│       ├── UserConfig.cs   # Cấu hình User
│       ├── UserLoginConfig.cs # Cấu hình UserLogin
│       ├── UserRoleConfig.cs # Cấu hình UserRole
│       └── UserTokenConfig.cs # Cấu hình UserToken
├── Migrations/             # Các migration
├── Repositories/           # Các repository
│   ├── Common/             # Repository chung
│   │   ├── BaseAsyncRepository.cs # Repository cơ sở
│   │   └── UnitOfWork.cs   # Triển khai Unit of Work
│   ├── OrderRepository.cs  # Repository Order
│   └── UserRefreshTokenRepository.cs # Repository RefreshToken
└── ServiceConfiguration/   # Cấu hình dịch vụ
    └── ServiceCollectionExtensions.cs # Mở rộng ServiceCollection
```

#### 2.2. CleanArc.Infrastructure.Identity
Thư mục quản lý xác thực và phân quyền:

```
CleanArc.Infrastructure.Identity/
├── Identity/               # Xác thực và phân quyền
│   ├── AppErrorDescriber.cs # Mô tả lỗi
│   ├── AppUserClaimsPrincipleFactory.cs # Factory tạo claims
│   ├── DataProtection/     # Bảo vệ dữ liệu
│   ├── Dtos/               # DTO
│   │   ├── CustomIdentityConstants.cs # Hằng số Identity
│   │   └── IdentitySettings.cs # Cài đặt Identity
│   ├── Extensions/         # Mở rộng
│   │   └── CustomIdentityExtensions.cs # Mở rộng Identity
│   ├── Manager/            # Quản lý
│   │   ├── AppRoleManager.cs # Quản lý vai trò
│   │   ├── AppSignInManager.cs # Quản lý đăng nhập
│   │   └── AppUserManager.cs # Quản lý người dùng
│   ├── PermissionManager/  # Quản lý quyền
│   │   ├── ConstantPolicies.cs # Chính sách cố định
│   │   ├── DynamicPermissionRequirement.cs # Yêu cầu quyền động
│   │   ├── DynamicPermissionService.cs # Dịch vụ quyền động
│   │   ├── IDynamicPermissionService.cs # Interface dịch vụ quyền động
│   │   └── RoleManagerService.cs # Dịch vụ quản lý vai trò
│   ├── SeedDatabaseService/ # Dịch vụ khởi tạo dữ liệu
│   │   └── SeedDataBase.cs # Khởi tạo dữ liệu
│   ├── Store/              # Lưu trữ
│   │   ├── AppUserStore.cs # Lưu trữ người dùng
│   │   └── RoleStore.cs    # Lưu trữ vai trò
│   └── validator/          # Xác thực
│       ├── AppRoleValidator.cs # Xác thực vai trò
│       └── AppUserValidator.cs # Xác thực người dùng
├── Jwt/                    # JWT
│   └── JwtService.cs       # Dịch vụ JWT
├── Profiles/               # Cấu hình AutoMapper
│   ├── ICreateMapper.cs    # Interface tạo mapper
│   └── RegisterMapper.cs   # Đăng ký mapper
├── ServiceConfiguration/   # Cấu hình dịch vụ
│   └── ServiceCollectionExtension.cs # Mở rộng ServiceCollection
└── UserManager/            # Quản lý người dùng
    └── AppUserManagerImplementation.cs # Triển khai quản lý người dùng
```

**Lưu ý**: Infrastructure layer triển khai các interface được định nghĩa trong Application layer và phụ thuộc vào cả Domain và Application layer.

### 3. API Layer

#### 3.1. CleanArc.Web.Api
Thư mục ứng dụng web API chính:

```
CleanArc.Web.Api/
├── Controllers/            # Các controller
│   └── V1/                 # API phiên bản 1
│       ├── Admin/          # Controller quản lý admin
│       ├── Order/          # Controller quản lý đơn hàng
│       └── UserManagement/ # Controller quản lý người dùng
├── Endpoints/              # Các endpoint (Minimal API)
│   ├── AdminManagerEndpoints.cs # Endpoint quản lý admin
│   └── UserEndpoints.cs    # Endpoint quản lý người dùng
├── Profile/                # Cấu hình AutoMapper
│   ├── ICreateMapper.cs    # Interface tạo mapper
│   └── RegisterMapper.cs   # Đăng ký mapper
├── Program.cs              # Điểm khởi đầu ứng dụng
├── Properties/             # Thuộc tính
│   └── launchSettings.json # Cài đặt khởi chạy
├── appsettings.Development.json # Cài đặt môi trường phát triển
└── appsettings.json        # Cài đặt ứng dụng
```

**Lưu ý**: API layer phụ thuộc vào tất cả các layer khác và là điểm tiếp xúc với người dùng.

### 4. Shared Layer

#### 4.1. CleanArc.SharedKernel
Thư mục chứa các thành phần dùng chung giữa các layer:

```
CleanArc.SharedKernel/
├── Extensions/             # Các extension method
│   ├── StringExtensions.cs # Mở rộng cho String
│   └── ValidatorExtensions.cs # Mở rộng cho Validator
└── ValidationBase/         # Cơ sở cho validation
    ├── Contracts/          # Các interface
    │   └── IValidatableModel.cs # Interface cho model có thể validate
    └── ApplicationBaseValidationModelProvider.cs # Provider cho validation
```

**Lưu ý**: Shared layer chứa các thành phần dùng chung giữa các layer khác nhau, giúp tránh lặp lại code và đảm bảo tính nhất quán trong toàn bộ ứng dụng. Layer này thường chứa các tiện ích, extension method, interface chung, enum, constant và các lớp cơ sở mà nhiều layer khác cần sử dụng.

## Mô hình dữ liệu
Dự án sử dụng Entity Framework Core với các entity chính:

- User : Kế thừa từ IdentityUser, quản lý người dùng và xác thực
- Order : Đại diện cho đơn hàng, có quan hệ với User

## Kiến trúc và Patterns
1. Clean Architecture : Phân tách rõ ràng các layer, dependencies chỉ đi từ ngoài vào trong
2. CQRS Pattern : Sử dụng Mediator để tách biệt commands và queries
3. Repository Pattern : Truy cập dữ liệu thông qua repositories và unit of work
4. Dependency Injection : Sử dụng DI container của .NET

## API Endpoints
API được tổ chức theo hai cách:

1. Controller-based API : Sử dụng các controller truyền thống (UserController)
2. Minimal API với Carter : Sử dụng Carter để định nghĩa các endpoints theo kiểu minimal API
API hỗ trợ versioning và có các endpoint chính:

- Đăng ký và xác thực người dùng
- Quản lý token JWT và refresh token
- Quản lý đơn hàng
- Quản lý admin

## Xác thực và Phân quyền
Dự án sử dụng:

- ASP.NET Core Identity cho quản lý người dùng
- JWT (JSON Web Tokens) cho xác thực
- Role-based authorization cho phân quyền

## Luồng xử lý
1. Request đến API endpoints (controller hoặc minimal API)
2. Mediator điều phối request đến handler tương ứng
3. Handler thực hiện business logic, gọi đến repositories
4. Repositories tương tác với database thông qua Entity Framework
5. Kết quả được trả về qua Mediator và API endpoint

## Luồng dữ liệu chi tiết

### Luồng xử lý Command (Thêm/Sửa/Xóa)
1. Request từ client đến API endpoint
2. Controller/Endpoint tạo Command và gửi đến Mediator
3. Mediator điều phối Command đến CommandHandler tương ứng
4. CommandHandler xác thực dữ liệu và thực hiện business logic
5. CommandHandler gọi Repository để thực hiện thao tác với database
6. Repository sử dụng DbContext để thực hiện thao tác CRUD
7. UnitOfWork commit các thay đổi vào database
8. Kết quả được trả về qua Mediator và API endpoint

### Luồng xử lý Query (Đọc dữ liệu)
1. Request từ client đến API endpoint
2. Controller/Endpoint tạo Query và gửi đến Mediator
3. Mediator điều phối Query đến QueryHandler tương ứng
4. QueryHandler thực hiện business logic
5. QueryHandler gọi Repository để lấy dữ liệu từ database
6. Repository sử dụng DbContext để thực hiện truy vấn
7. Kết quả được trả về qua Mediator và API endpoint

### Luồng xác thực và phân quyền
1. Request từ client đến API endpoint với JWT token
2. Middleware xác thực JWT token
3. Nếu token hợp lệ, Identity lấy thông tin người dùng và vai trò
4. Authorization middleware kiểm tra quyền truy cập
5. Nếu có quyền, request được chuyển đến Controller/Endpoint
6. Nếu không có quyền, trả về lỗi 403 Forbidden

Dự án này là một ví dụ tốt về việc áp dụng Clean Architecture trong ứng dụng .NET, giúp tạo ra code dễ bảo trì, mở rộng và test.